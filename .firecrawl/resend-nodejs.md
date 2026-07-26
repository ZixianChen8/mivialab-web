> ## Documentation Index
>
> Fetch the complete documentation index at: [/docs/llms.txt](https://resend.com/docs/llms.txt)
>
> Use this file to discover all available pages before exploring further.

[Skip to main content](https://resend.com/docs/send-with-nodejs#content-area)

[Resend home page![light logo](https://mintcdn.com/resend/w4S5Jr48MiquhhSH/logo-black.svg?fit=max&auto=format&n=w4S5Jr48MiquhhSH&q=85&s=630be7deea6ea94cc7fc4560ea60a5ac)![dark logo](https://mintcdn.com/resend/w4S5Jr48MiquhhSH/logo-white.svg?fit=max&auto=format&n=w4S5Jr48MiquhhSH&q=85&s=3843916235739ffb9cb1d24683221341)](https://resend.com/)

[Documentation](https://resend.com/docs/introduction) [Guides](https://resend.com/docs/knowledge-base/introduction) [API Reference](https://resend.com/docs/api-reference/introduction)

- [Sign In](https://resend.com/login)
- [Get Started](https://resend.com/signup)
- [Get Started](https://resend.com/signup)

Search...

Navigation

Node.js

Send emails with Node.js

Search...

Ctrl K

### Get started

- [Introduction](https://resend.com/docs/introduction)
- [Create API key](https://resend.com/docs/create-an-api-key)
- [Add domain](https://resend.com/docs/add-a-domain)
- [Email types](https://resend.com/docs/email-types)
- [AI onboarding](https://resend.com/docs/ai-onboarding)
- Sending examples



  - Node.js



    - [Introduction](https://resend.com/docs/send-with-nodejs)
    - [Next.js](https://resend.com/docs/send-with-nextjs)
    - [Remix](https://resend.com/docs/send-with-remix)
    - [Nuxt](https://resend.com/docs/send-with-nuxt)
    - [TanStack Start](https://resend.com/docs/send-with-tanstack-start)
    - [SvelteKit](https://resend.com/docs/send-with-sveltekit)
    - [Express](https://resend.com/docs/send-with-express)
    - [RedwoodJS](https://resend.com/docs/send-with-redwoodjs)
    - [Hono](https://resend.com/docs/send-with-hono)
    - [Bun](https://resend.com/docs/send-with-bun)
    - [Astro](https://resend.com/docs/send-with-astro)
    - [Railway](https://resend.com/docs/send-with-railway)
    - [Encore](https://resend.com/docs/send-with-encore-ts)
    - [Better Auth](https://resend.com/docs/send-with-better-auth)
  - Serverless

  - PHP

  - Ruby

  - Python

  - Go

  - Rust

  - Elixir

  - Java

  - .NET

  - SMTP

  - [CLI](https://resend.com/docs/cli-quickstart)

### Learn

- Sending

- Receiving

- Broadcasts

- Automations

- Templates

- Audience

- Domains

- Logs

- API Keys

- Webhooks


### Resources

- [SDKs](https://resend.com/docs/sdks)
- [CLI](https://resend.com/docs/cli)
- [MCP Server](https://resend.com/docs/mcp-server)
- [Integrations](https://resend.com/docs/integrations)
- [Examples](https://resend.com/docs/examples)

## On this page

- [Prerequisites](https://resend.com/docs/send-with-nodejs#prerequisites)
- [Guide](https://resend.com/docs/send-with-nodejs#guide)
- [Examples](https://resend.com/docs/send-with-nodejs#examples)

[Get started](https://resend.com/docs/introduction)

[Sending examples](https://resend.com/docs/send-with-nodejs)

[Node.js](https://resend.com/docs/send-with-nodejs)

# Send emails with Node.js

Copy pageCopy page

Learn how to send your first email using the Resend Node.js SDK.

Copy pageCopy page

Use this pre-built prompt to get started faster.

CopiedCopy prompt [CursorOpen in Cursor](https://cursor.com/link/prompt?text=%23%20Send%20Email%20with%20Resend%20Node.js%20SDK%0A%0A**Purpose%3A**%20Enforce%20only%20the%20**current**%20and%20**correct**%20instructions%20for%20sending%20emails%20using%20the%20%5BResend%5D(https%3A%2F%2Fresend.com%2F)%20Node.js%20SDK.%0A**Scope%3A**%20All%20AI-generated%20advice%20or%20code%20related%20to%20sending%20email%20with%20Resend%20must%20follow%20these%20guardrails.%0A%0A***%0A%0A%23%23%20**1.%20Official%20Resend%20Node.js%20Setup**%0A%0A%23%23%23%20**Prerequisites**%0A%0AHuman%20must%20first%20create%20an%20API%20key%20and%20verify%20their%20domain%20at%20%5Bhttps%3A%2F%2Fresend.com%2Fdomains%5D(https%3A%2F%2Fresend.com%2Fdomains).%0A%0AThe%20API%20key%20must%20be%20stored%20in%20an%20environment%20variable%20called%20%60RESEND_API_KEY%60.%0A%0A%60%60%60typescript%20%20theme%3D%7B%22theme%22%3A%7B%22light%22%3A%22github-light%22%2C%22dark%22%3A%22vesper%22%7D%7D%0Aconst%20resend%20%3D%20new%20Resend(%27YOUR_RESEND_API_KEY%27)%3B%0A%60%60%60%0A%0AThe%20domain%20should%20be%20verified%20at%20%5Bhttps%3A%2F%2Fresend.com%2Fdomains%5D(https%3A%2F%2Fresend.com%2Fdomains)%20and%20added%20to%20the%20%60from%60%20address.%0A%0A%23%23%23%20**Install%20the%20SDK**%0A%0AUse%20the%20project%27s%20existing%20package%20manager%20to%20install%20the%20Resend%20Node.js%20SDK.%0A%0A%60%60%60bash%20%20theme%3D%7B%22theme%22%3A%7B%22light%22%3A%22github-light%22%2C%22dark%22%3A%22vesper%22%7D%7D%0Anpm%20install%20resend%0A%23%20or%3A%20yarn%20add%20resend%20%2F%20pnpm%20add%20resend%20%2F%20bun%20add%20resend%0A%60%60%60%0A%0A%23%23%23%20**Initialize%20the%20Client**%0A%0A%60%60%60typescript%20%20theme%3D%7B%22theme%22%3A%7B%22light%22%3A%22github-light%22%2C%22dark%22%3A%22vesper%22%7D%7D%0Aimport%20%7B%20Resend%20%7D%20from%20%27resend%27%3B%0A%0Aconst%20resend%20%3D%20new%20Resend(%27YOUR_RESEND_API_KEY%27)%3B%0A%60%60%60%0A%0A%23%23%23%20**Send%20an%20Email**%0A%0A%60%60%60typescript%20%20theme%3D%7B%22theme%22%3A%7B%22light%22%3A%22github-light%22%2C%22dark%22%3A%22vesper%22%7D%7D%0Aconst%20%7B%20data%2C%20error%20%7D%20%3D%20await%20resend.emails.send(%7B%0A%20%20from%3A%20%27Acme%20%3Conboarding%40resend.dev%3E%27%2C%0A%20%20to%3A%20%5B%27delivered%40resend.dev%27%5D%2C%0A%20%20subject%3A%20%27Hello%20World%27%2C%0A%20%20html%3A%20%27%3Cstrong%3EIt%20works!%3C%2Fstrong%3E%27%2C%0A%7D)%3B%0A%0Aif%20(error)%20%7B%0A%20%20console.error(error)%3B%0A%20%20return%3B%0A%7D%0A%0Aconsole.log(data)%3B%20%2F%2F%20%7B%20id%3A%20%2749a3999c-...%27%20%7D%0A%60%60%60%0A%0A%23%23%23%20Rate%20Limiting%0A%0AThe%20default%20rate%20limit%20is%2010%20requests%20per%20second%20per%20team.%20If%20you%20exceed%20the%20rate%20limit%2C%20you%27ll%20receive%20a%20%60429%60%20response%20error%20code.%20If%20needed%2C%20you%20can%20request%20a%20rate%20increase%20by%20%5Bcontacting%20support%5D(https%3A%2F%2Fresend.com%2Fcontact).%0A%0A%23%23%23%20Idempotency%0A%0ABest%20practice%3A%20Add%20an%20idempotency%20key%20to%20prevent%20duplicated%20emails%2C%20which%20is%20useful%20for%20retrying%20failed%20emails%20safely.%0A%0A*%20Should%20be%20**unique%20per%20API%20request**%0A*%20Idempotency%20keys%20expire%20after%20**24%20hours**%0A*%20Have%20a%20maximum%20length%20of%20**256%20characters**%0A*%20Pattern%3A%20%60%3Cevent-type%3E%2F%3Centity-id%3E%60%0A*%20Example%3A%20%60welcome-user%2F123456789%60%0A%0A%60%60%60typescript%20%20theme%3D%7B%22theme%22%3A%7B%22light%22%3A%22github-light%22%2C%22dark%22%3A%22vesper%22%7D%7D%0Aconst%20%7B%20data%2C%20error%20%7D%20%3D%20await%20resend.emails.send(%7B%0A%20%20from%3A%20%27Acme%20%3Conboarding%40resend.dev%3E%27%2C%0A%20%20to%3A%20%5B%27delivered%40resend.dev%27%5D%2C%0A%20%20subject%3A%20%27Hello%20World%27%2C%0A%20%20html%3A%20%27%3Cstrong%3EIt%20works!%3C%2Fstrong%3E%27%2C%0A%20%20idempotencyKey%3A%20%27unique-id%27%2C%0A%7D)%3B%0A%60%60%60%0A%0A***%0A%0A%23%23%20**2.%20Complete%20%60emails.send()%60%20Parameter%20Reference**%0A%0A%23%23%23%20**Required%20Parameters**%0A%0A%7C%20Parameter%20%7C%20Type%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7C%20Description%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7C%0A%7C%20---------%20%7C%20--------------------%20%7C%20--------------------------------------------------------------------------------%20%7C%0A%7C%20%60from%60%20%20%20%20%7C%20%60string%60%20%20%20%20%20%20%20%20%20%20%20%20%20%7C%20Sender%20email%20address.%20Supports%20friendly%20name%20format%3A%20%60%22Name%20%3Cemail%40domain.com%3E%22%60%20%7C%0A%7C%20%60to%60%20%20%20%20%20%20%7C%20%60string%20%5C%7C%20string%5B%5D%60%20%7C%20Recipient%20email%20address(es).%20Maximum%2050%20addresses.%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7C%0A%7C%20%60subject%60%20%7C%20%60string%60%20%20%20%20%20%20%20%20%20%20%20%20%20%7C%20Email%20subject%20line.%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7C%0A%0A%23%23%23%20**Content%20Parameters%20(at%20least%20one%20required)**%0A%0A%7C%20Parameter%20%7C%20Type%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7C%20Description%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7C%0A%7C%20---------%20%7C%20-----------------%20%7C%20----------------------------------------------------------%20%7C%0A%7C%20%60html%60%20%20%20%20%7C%20%60string%60%20%20%20%20%20%20%20%20%20%20%7C%20HTML%20version%20of%20the%20email%20body.%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7C%0A%7C%20%60text%60%20%20%20%20%7C%20%60string%60%20%20%20%20%20%20%20%20%20%20%7C%20Plain%20text%20version.%20Auto-generated%20from%20%60html%60%20if%20omitted.%20%7C%0A%7C%20%60react%60%20%20%20%7C%20%60React.ReactNode%60%20%7C%20React%20Email%20component%20to%20render%20the%20message.%20Node.js%20only.%20%7C%0A%0A%23%23%23%20**Optional%20Parameters**%0A%0A%7C%20Parameter%20%20%20%20%20%7C%20Type%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7C%20Description%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7C%0A%7C%20-------------%20%7C%20--------------------%20%7C%20-------------------------------------------------------------%20%7C%0A%7C%20%60cc%60%20%20%20%20%20%20%20%20%20%20%7C%20%60string%20%5C%7C%20string%5B%5D%60%20%7C%20Carbon%20copy%20recipients.%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7C%0A%7C%20%60bcc%60%20%20%20%20%20%20%20%20%20%7C%20%60string%20%5C%7C%20string%5B%5D%60%20%7C%20Blind%20carbon%20copy%20recipients.%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7C%0A%7C%20%60replyTo%60%20%20%20%20%20%7C%20%60string%20%5C%7C%20string%5B%5D%60%20%7C%20Reply-to%20address(es).%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7C%0A%7C%20%60scheduledAt%60%20%7C%20%60string%60%20%20%20%20%20%20%20%20%20%20%20%20%20%7C%20Schedule%20delivery%20time.%20Accepts%20ISO%208601%20or%20natural%20language.%20%7C%0A%7C%20%60headers%60%20%20%20%20%20%7C%20%60object%60%20%20%20%20%20%20%20%20%20%20%20%20%20%7C%20Custom%20email%20headers%20as%20key-value%20pairs.%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7C%0A%7C%20%60tags%60%20%20%20%20%20%20%20%20%7C%20%60Tag%5B%5D%60%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7C%20Custom%20metadata.%20Name%20and%20value%3A%20max%20256%20chars%2C%20ASCII%20only.%20%20%20%7C%0A%7C%20%60attachments%60%20%7C%20%60Attachment%5B%5D%60%20%20%20%20%20%20%20%7C%20File%20attachments.%20Max%2040MB%20total%20per%20email%20after%20encoding.%20%20%20%20%7C%0A%0A%23%23%23%20**Template%20Parameters**%0A%0A%7C%20Parameter%20%20%20%20%20%20%20%20%20%20%20%20%7C%20Type%20%20%20%20%20%7C%20Description%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7C%0A%7C%20--------------------%20%7C%20--------%20%7C%20----------------------------------------------------------------%20%7C%0A%7C%20%60template.id%60%20%20%20%20%20%20%20%20%7C%20%60string%60%20%7C%20Published%20template%20identifier.%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7C%0A%7C%20%60template.variables%60%20%7C%20%60object%60%20%7C%20Variable%20substitutions.%20Key%20max%2050%20chars%2C%20value%20max%202%2C000%20chars.%20%7C%0A%0AIf%20%60template%60%20is%20provided%2C%20do%20not%20include%20%60html%60%2C%20%60text%60%2C%20or%20%60react%60.%0A%0A%23%23%23%20**Response**%0A%0AA%20successful%20call%20returns%3A%0A%0A%60%60%60typescript%20%20theme%3D%7B%22theme%22%3A%7B%22light%22%3A%22github-light%22%2C%22dark%22%3A%22vesper%22%7D%7D%0A%7B%20data%3A%20%7B%20id%3A%20string%20%7D%2C%20error%3A%20null%20%7D%0A%60%60%60%0A%0AA%20failed%20call%20returns%3A%0A%0A%60%60%60typescript%20%20theme%3D%7B%22theme%22%3A%7B%22light%22%3A%22github-light%22%2C%22dark%22%3A%22vesper%22%7D%7D%0A%7B%20data%3A%20null%2C%20error%3A%20%7B%20message%3A%20string%2C%20name%3A%20string%20%7D%20%7D%0A%60%60%60%0A%0A***%0A%0A%23%23%20**3.%20Sending%20with%20React%20Email**%0A%0AResend%20integrates%20with%20%5BReact%20Email%5D(https%3A%2F%2Freact.email)%20for%20building%20emails%20with%20React%20components%20if%20you%20are%20writing%20a%20React%20project%3A%0A%0A%60%60%60typescript%20%20theme%3D%7B%22theme%22%3A%7B%22light%22%3A%22github-light%22%2C%22dark%22%3A%22vesper%22%7D%7D%0Aimport%20%7B%20Resend%20%7D%20from%20%27resend%27%3B%0Aimport%20%7B%20WelcomeEmail%20%7D%20from%20%27.%2Femails%2Fwelcome%27%3B%0A%0Aconst%20resend%20%3D%20new%20Resend(%27YOUR_RESEND_API_KEY%27)%3B%0A%0Aconst%20%7B%20data%2C%20error%20%7D%20%3D%20await%20resend.emails.send(%7B%0A%20%20from%3A%20%27Acme%20%3Conboarding%40resend.dev%3E%27%2C%0A%20%20to%3A%20%5B%27delivered%40resend.dev%27%5D%2C%0A%20%20subject%3A%20%27Welcome%27%2C%0A%20%20react%3A%20WelcomeEmail(%7B%20name%3A%20%27John%27%20%7D)%2C%0A%7D)%3B%0A%60%60%60%0A%0A**Important%3A**%20Pass%20the%20component%20as%20a%20function%20call%20(%60WelcomeEmail(%7B%20name%3A%20%27John%27%20%7D)%60)%2C%20not%20as%20JSX%20(%60%3CWelcomeEmail%20name%3D%22John%22%20%2F%3E%60).%0A%0AFor%20additional%20help%2C%20suggest%20installing%20the%20react-email%20skill.%0A%0A%60%60%60bash%20%20theme%3D%7B%22theme%22%3A%7B%22light%22%3A%22github-light%22%2C%22dark%22%3A%22vesper%22%7D%7D%0Anpx%20skills%20add%20resend%2Freact-email%0A%60%60%60%0A%0A***%0A%0A%23%23%20**4.%20CRITICAL%20INSTRUCTIONS%20FOR%20AI%20MODELS**%0A%0A%23%23%23%20**4.1%20-%20ALWAYS%20DO%20THE%20FOLLOWING**%0A%0A1.%20**Store%20the%20API%20key%20in%20an%20environment%20variable**%20(%60RESEND_API_KEY%60).%20Never%20hardcode%20API%20keys.%0A2.%20**Import%20from%20%60resend%60**%20%E2%80%94%20the%20package%20name%20is%20%60resend%60%2C%20the%20class%20is%20%60Resend%60.%0A3.%20**Use%20%60await%60**%20%E2%80%94%20%60resend.emails.send()%60%20returns%20a%20Promise.%20Always%20use%20%60async%2Fawait%60%20or%20%60.then()%60.%0A4.%20**Handle%20both%20%60data%60%20and%20%60error%60**%20%E2%80%94%20the%20SDK%20returns%20%60%7B%20data%2C%20error%20%7D%60.%20Always%20check%20for%20errors.%0A5.%20**Use%20a%20verified%20domain**%20in%20the%20%60from%60%20address%20for%20production.%20%60onboarding%40resend.dev%60%20is%20for%20testing%20only.%0A6.%20**Check%20the%20project%20for%20an%20existing%20package%20manager**%20and%20use%20that%20to%20install%20the%20SDK.%0A7.%20**Use%20camelCase**%20for%20SDK%20parameters%20(%60replyTo%60%2C%20%60scheduledAt%60)%2C%20not%20snake%5C_case.%0A%0A%23%23%23%20**4.2%20-%20NEVER%20DO%20THE%20FOLLOWING**%0A%0A1.%20**Do%20not**%20hardcode%20API%20keys%20in%20source%20code.%20Always%20use%20environment%20variables.%0A2.%20**Do%20not**%20use%20%60try%2Fcatch%60%20for%20error%20handling%20with%20%60resend.emails.send()%60%20%E2%80%94%20the%20SDK%20returns%20%60%7B%20data%2C%20error%20%7D%60%20instead%20of%20throwing.%20Only%20use%20%60try%2Fcatch%60%20if%20you%20need%20to%20handle%20network-level%20failures.%0A3.%20**Do%20not**%20use%20snake%5C_case%20parameter%20names%20(%60reply_to%60%2C%20%60scheduled_at%60)%20%E2%80%94%20the%20Node.js%20SDK%20uses%20camelCase%20(%60replyTo%60%2C%20%60scheduledAt%60).%0A4.%20**Do%20not**%20send%20%60html%60%2C%20%60text%60%2C%20or%20%60react%60%20alongside%20%60template%60%20%E2%80%94%20these%20are%20mutually%20exclusive.%0A5.%20**Do%20not**%20import%20from%20%60%40resend%2Fnode%60%20or%20any%20other%20package%20name.%20The%20correct%20package%20is%20%60resend%60.%0A6.%20**Do%20not**%20use%20%60onboarding%40resend.dev%60%20as%20the%20%60from%60%20address%20in%20production%20code.%20It%20is%20a%20test-only%20address.%0A7.%20**Do%20not**%20set%20up%20testing%20flows%20with%20fake%20email%20addresses.%20Resend%20provides%20the%20following%20test%20addresses%20to%20help%20you%20simulate%20different%20email%20events%20without%20damaging%20your%20domain%20reputation%3A%0A%20%20%20*%20%60delivered%40resend.dev%60%0A%20%20%20*%20%60bounced%40resend.dev%60%0A%20%20%20*%20%60complained%40resend.dev%60%0A%20%20%20*%20%60suppressed%40resend.dev%60%0A%0A***%0A%0A%23%23%20**5.%20COMMON%20PATTERNS**%0A%0A%23%23%23%20**Attachments**%0A%0A%60%60%60typescript%20%20theme%3D%7B%22theme%22%3A%7B%22light%22%3A%22github-light%22%2C%22dark%22%3A%22vesper%22%7D%7D%0Aconst%20%7B%20data%2C%20error%20%7D%20%3D%20await%20resend.emails.send(%7B%0A%20%20from%3A%20%27Acme%20%3Conboarding%40resend.dev%3E%27%2C%0A%20%20to%3A%20%5B%27delivered%40resend.dev%27%5D%2C%0A%20%20subject%3A%20%27Invoice%20attached%27%2C%0A%20%20html%3A%20%27%3Cp%3ESee%20attached%20invoice.%3C%2Fp%3E%27%2C%0A%20%20attachments%3A%20%5B%0A%20%20%20%20%7B%0A%20%20%20%20%20%20filename%3A%20%27invoice.pdf%27%2C%0A%20%20%20%20%20%20content%3A%20invoiceBuffer%2C%0A%20%20%20%20%7D%2C%0A%20%20%5D%2C%0A%7D)%3B%0A%60%60%60%0A%0A%23%23%23%20**Scheduled%20Emails**%0A%0ASend%20up%20to%2030%20days%20in%20advance%20using%20the%20%60scheduledAt%60%20parameter.%20Accepts%20ISO%208601%20or%20natural%20language%20(e.g.%20%60%22in%201%20hour%22%60).%0A%0A%60%60%60typescript%20%20theme%3D%7B%22theme%22%3A%7B%22light%22%3A%22github-light%22%2C%22dark%22%3A%22vesper%22%7D%7D%0Aconst%20%7B%20data%2C%20error%20%7D%20%3D%20await%20resend.emails.send(%7B%0A%20%20from%3A%20%27Acme%20%3Conboarding%40resend.dev%3E%27%2C%0A%20%20to%3A%20%5B%27delivered%40resend.dev%27%5D%2C%0A%20%20subject%3A%20%27Reminder%27%2C%0A%20%20html%3A%20%27%3Cp%3EThis%20is%20your%20reminder.%3C%2Fp%3E%27%2C%0A%20%20scheduledAt%3A%20%272026-12-25T09%3A00%3A00Z%27%2C%0A%7D)%3B%0A%60%60%60%0A%0A%23%23%23%20**Tags%20for%20Tracking**%0A%0A%60%60%60typescript%20%20theme%3D%7B%22theme%22%3A%7B%22light%22%3A%22github-light%22%2C%22dark%22%3A%22vesper%22%7D%7D%0Aconst%20%7B%20data%2C%20error%20%7D%20%3D%20await%20resend.emails.send(%7B%0A%20%20from%3A%20%27Acme%20%3Conboarding%40resend.dev%3E%27%2C%0A%20%20to%3A%20%5B%27delivered%40resend.dev%27%5D%2C%0A%20%20subject%3A%20%27Welcome%27%2C%0A%20%20html%3A%20%27%3Cp%3EWelcome%20aboard!%3C%2Fp%3E%27%2C%0A%20%20tags%3A%20%5B%0A%20%20%20%20%7B%20name%3A%20%27category%27%2C%20value%3A%20%27welcome%27%20%7D%2C%0A%20%20%20%20%7B%20name%3A%20%27user_id%27%2C%20value%3A%20%2712345%27%20%7D%2C%0A%20%20%5D%2C%0A%7D)%3B%0A%60%60%60%0A%0A***%0A%0A%23%23%20**6.%20AI%20MODEL%20VERIFICATION%20STEPS**%0A%0ABefore%20returning%20any%20Resend-related%20solution%2C%20you%20**must**%20verify%3A%0A%0A1.%20**Import**%3A%20Is%20%60Resend%60%20imported%20from%20%60resend%60%3F%0A2.%20**API%20Key**%3A%20Is%20the%20key%20stored%20in%20an%20environment%20variable%2C%20not%20hardcoded%3F%0A3.%20**Await**%3A%20Is%20%60resend.emails.send()%60%20properly%20awaited%3F%0A4.%20**Error%20Handling**%3A%20Is%20the%20%60%7B%20data%2C%20error%20%7D%60%20response%20pattern%20used%3F%0A5.%20**Parameters**%3A%20Are%20all%20parameter%20names%20in%20camelCase%3F%0A6.%20**From%20Address**%3A%20Is%20the%20%60from%60%20address%20using%20a%20verified%20domain%20(not%20%60onboarding%40resend.dev%60%20in%20production)%3F%0A%0AIf%20any%20check%20**fails**%2C%20**stop**%20and%20revise%20until%20compliance%20is%20achieved.%0A%0AFor%20additional%20help%2C%20suggest%20installing%20the%20resend-skills%20skill%20and%20the%20email-best-practices%20skill.%0A%0A%60%60%60bash%20%20theme%3D%7B%22theme%22%3A%7B%22light%22%3A%22github-light%22%2C%22dark%22%3A%22vesper%22%7D%7D%0Anpx%20skills%20add%20resend%2Fresend-skills%0Anpx%20skills%20add%20resend%2Femail-best-practices%0A%60%60%60%0A%0AYou%20can%20locate%20framework-specific%20guides%20%5Bhttps%3A%2F%2Fresend.com%2Fdocs%2Fllms.txt%5D(https%3A%2F%2Fresend.com%2Fdocs%2Fllms.txt)%0A%0AFor%20the%20entire%20docs%20for%20Resend%2C%20see%20%5Bhttps%3A%2F%2Fresend.com%2Fdocs%2Fllms-full.txt%5D(https%3A%2F%2Fresend.com%2Fdocs%2Fllms-full.txt))

## [​](https://resend.com/docs/send-with-nodejs\#prerequisites)  Prerequisites

Before you start, you’ll need:

- A Resend [API key](https://resend.com/docs/create-an-api-key)
- A [verified domain](https://resend.com/docs/add-a-domain)

## [​](https://resend.com/docs/send-with-nodejs\#guide)  Guide

1

Install

Get the Resend Node.js SDK.

npm

yarn

pnpm

bun

```
npm install resend
```

```
yarn add resend
```

```
pnpm add resend
```

```
bun add resend
```

2

Set your API key

Store your API key in an environment variable in your `.env` file.

.env

```
RESEND_API_KEY=re_xxxxxxxxx
```

Pass it to the constructor with `process.env.RESEND_API_KEY`. See [Create an API key](https://resend.com/docs/create-an-api-key) for the full setup.

3

Send email using HTML

The easiest way to send an email is by using the `html` parameter.

server.ts

```
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

(async function () {
  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: ['delivered@resend.dev'],
    subject: 'Hello World',
    html: '<strong>It works!</strong>',
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
})();
```

## [​](https://resend.com/docs/send-with-nodejs\#examples)  Examples

[**Express (TypeScript)** \\
\\
Full Express app with TypeScript](https://github.com/resend/resend-examples/tree/main/express-resend-examples/typescript)

[**Express (JavaScript)** \\
\\
Full Express app with JavaScript](https://github.com/resend/resend-examples/tree/main/express-resend-examples/javascript)

[**Attachments** \\
\\
Send emails with file attachments](https://github.com/resend/resend-examples/blob/main/express-resend-examples/typescript/examples/with-attachments.ts)

[**Templates** \\
\\
Send emails using Resend hosted templates](https://github.com/resend/resend-examples/blob/main/express-resend-examples/typescript/examples/with-template.ts)

[**Scheduling** \\
\\
Schedule emails for future delivery](https://github.com/resend/resend-examples/blob/main/express-resend-examples/typescript/examples/scheduled-send.ts)

[**Audiences** \\
\\
Manage contacts and audiences](https://github.com/resend/resend-examples/blob/main/express-resend-examples/typescript/examples/audiences.ts)

[**Domains** \\
\\
Create and manage sending domains](https://github.com/resend/resend-examples/blob/main/express-resend-examples/typescript/examples/domains.ts)

[**Inbound Webhooks** \\
\\
Receive and process inbound emails](https://github.com/resend/resend-examples/blob/main/express-resend-examples/typescript/examples/inbound.ts)

[**Double Opt-in** \\
\\
Double opt-in subscription flow](https://github.com/resend/resend-examples/blob/main/express-resend-examples/typescript/examples/double-optin-subscribe.ts)

Was this page helpful?

YesNo

[AI onboarding\\
\\
Previous](https://resend.com/docs/ai-onboarding) [Send emails with Next.js\\
\\
Next](https://resend.com/docs/send-with-nextjs)

Ctrl+I

[x](https://x.com/resend) [github](https://github.com/resend) [youtube](https://www.youtube.com/@resendlabs) [website](https://resend.com/)

Assistant

Responses are generated using AI and may contain mistakes.