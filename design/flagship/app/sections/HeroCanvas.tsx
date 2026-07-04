"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The single hero "wow" moment: a domain-warped fractal-noise field rendered in
 * raw WebGL (no extra dependency), tinted near-black with a single accent wisp
 * that drifts toward the pointer.
 *
 * Static fallback: on coarse pointers / narrow screens / prefers-reduced-motion
 * this renders nothing, and the CSS gradient behind it (see Hero.module.css)
 * stands in. The loop also pauses when the hero scrolls out of view and when
 * the tab is hidden, to stay inside the perf budget.
 */
const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.02;
    a *= 0.5;
  }
  return v;
}
void main() {
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 aspect = vec2(u_res.x / u_res.y, 1.0);
  vec2 p = uv * aspect * 2.4;
  float t = u_time * 0.05;
  vec2 m = (u_mouse - 0.5) * aspect;
  vec2 q = vec2(fbm(p + t + m * 1.2), fbm(p + vec2(5.2, 1.3) - t * 0.8));
  float f = fbm(p + q * 1.8 + m * 0.4);
  vec3 bg = vec3(0.039, 0.039, 0.039);
  vec3 deep = vec3(0.07, 0.06, 0.085);
  vec3 accent = vec3(1.0, 0.329, 0.212);
  vec3 col = mix(bg, deep, smoothstep(0.2, 0.8, f));
  col = mix(col, accent, smoothstep(0.62, 1.05, f) * 0.5);
  float vig = 1.0 - 0.55 * length(uv - 0.5);
  col *= vig;
  col += (hash(gl_FragCoord.xy + u_time) - 0.5) * 0.015;
  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function HeroCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fineWide = window.matchMedia(
      "(min-width: 760px) and (pointer: fine)"
    ).matches;
    if (!reduced && fineWide) setActive(true);
  }, []);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      (canvas.getContext("webgl", { antialias: true, alpha: false }) as
        | WebGLRenderingContext
        | null) ?? null;
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "u_res");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uMouse = gl.getUniformLocation(program, "u_mouse");

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      const w = Math.floor(canvas.clientWidth * dpr);
      const h = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    let mx = 0.5;
    let my = 0.5;
    let tx = 0.5;
    let ty = 0.5;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width;
      ty = 1 - (e.clientY - r.top) / r.height;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    let visible = true;
    const start = performance.now();
    const render = (now: number) => {
      resize();
      mx += (tx - mx) * 0.05;
      my += (ty - my) * 0.05;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uMouse, mx, my);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(render);
    };

    const play = () => {
      if (!raf && visible && document.visibilityState === "visible") {
        raf = requestAnimationFrame(render);
      }
    };
    const stop = () => {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        visible ? play() : stop();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const onVisibility = () =>
      document.visibilityState === "visible" ? play() : stop();
    document.addEventListener("visibilitychange", onVisibility);

    play();

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, [active]);

  if (!active) return null;
  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
