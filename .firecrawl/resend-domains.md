> ## Documentation Index
>
> Fetch the complete documentation index at: [/docs/llms.txt](https://resend.com/docs/llms.txt)
>
> Use this file to discover all available pages before exploring further.

[Skip to main content](https://resend.com/docs/dashboard/domains/introduction#content-area)

[Resend home page![light logo](https://mintcdn.com/resend/w4S5Jr48MiquhhSH/logo-black.svg?fit=max&auto=format&n=w4S5Jr48MiquhhSH&q=85&s=630be7deea6ea94cc7fc4560ea60a5ac)![dark logo](https://mintcdn.com/resend/w4S5Jr48MiquhhSH/logo-white.svg?fit=max&auto=format&n=w4S5Jr48MiquhhSH&q=85&s=3843916235739ffb9cb1d24683221341)](https://resend.com/)

[Documentation](https://resend.com/docs/introduction) [Guides](https://resend.com/docs/knowledge-base/introduction) [API Reference](https://resend.com/docs/api-reference/introduction)

- [Sign In](https://resend.com/login)
- [Get Started](https://resend.com/signup)
- [Get Started](https://resend.com/signup)

Search...

Navigation

Domains

Managing Domains

Search...

Ctrl K

### Get started

- [Introduction](https://resend.com/docs/introduction)
- [Create API key](https://resend.com/docs/create-an-api-key)
- [Add domain](https://resend.com/docs/add-a-domain)
- [Email types](https://resend.com/docs/email-types)
- [AI onboarding](https://resend.com/docs/ai-onboarding)
- Sending examples


### Learn

- Sending

- Receiving

- Broadcasts

- Automations

- Templates

- Audience

- Domains



  - [Introduction](https://resend.com/docs/dashboard/domains/introduction)
  - [Claiming a domain](https://resend.com/docs/dashboard/domains/claim)
  - [Tracking](https://resend.com/docs/dashboard/domains/tracking)
  - [Regions](https://resend.com/docs/dashboard/domains/regions)
  - [DMARC](https://resend.com/docs/dashboard/domains/dmarc)
  - [BIMI](https://resend.com/docs/dashboard/domains/bimi)
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

- [Domain management](https://resend.com/docs/dashboard/domains/introduction#domain-management)
- [View domain details](https://resend.com/docs/dashboard/domains/introduction#view-domain-details)
- [Understand a domain status](https://resend.com/docs/dashboard/domains/introduction#understand-a-domain-status)
- [View DNS records](https://resend.com/docs/dashboard/domains/introduction#view-dns-records)
- [Configure open and click tracking](https://resend.com/docs/dashboard/domains/introduction#configure-open-and-click-tracking)
- [Configure Enforced Transport Layer Security (TLS)](https://resend.com/docs/dashboard/domains/introduction#configure-enforced-transport-layer-security-tls)
- [Custom Return Path](https://resend.com/docs/dashboard/domains/introduction#custom-return-path)
- [Export your data](https://resend.com/docs/dashboard/domains/introduction#export-your-data)
- [What are SPF records](https://resend.com/docs/dashboard/domains/introduction#what-are-spf-records)
- [What are DKIM records](https://resend.com/docs/dashboard/domains/introduction#what-are-dkim-records)
- [FAQ](https://resend.com/docs/dashboard/domains/introduction#faq)

[Learn](https://resend.com/docs/dashboard/emails/introduction)

[Domains](https://resend.com/docs/dashboard/domains/introduction)

# Managing Domains

Copy pageCopy page

Visualize all the domains on the Resend Dashboard.

Copy pageCopy page

Resend sends emails using a domain you own (not a shared or public domain). You must [add and verify at least one domain](https://resend.com/docs/add-a-domain) to send and receive emails with Resend.

Domain not verifying? [Try\\
this](https://resend.com/docs/knowledge-base/what-if-my-domain-is-not-verifying).

## [​](https://resend.com/docs/dashboard/domains/introduction\#domain-management)  Domain management

You can view and manage your domains from the [Domains Dashboard](https://resend.com/domains). You can also manage your sending and receiving domains using the [API](https://resend.com/docs/api-reference/domains/create-domain), the [CLI](https://resend.com/docs/cli#domains), or the [MCP server](https://resend.com/docs/mcp-server).We recommend sending your emails from one or more subdomains (e.g., `updates.example.com`) instead of your root domain to isolate your sending reputation and to clearly communicate your intent to your recipients.Each individual subdomain must be added and verified independently, and they will each be listed separately in your Dashboard.Learn more about [the benefits of sending emails from a subdomain](https://resend.com/docs/knowledge-base/is-it-better-to-send-emails-from-a-subdomain-or-the-root-domain).

## [​](https://resend.com/docs/dashboard/domains/introduction\#view-domain-details)  View domain details

The [Domains dashboard](https://resend.com/domains) shows information about your domain name, its verification status, and history.

## [​](https://resend.com/docs/dashboard/domains/introduction\#understand-a-domain-status)  Understand a domain status

Domains can have different statuses, including:

- `not_started`: You’ve added a domain to Resend, but you haven’t clicked on `Verify DNS Records` yet.
- `pending`: Resend is still trying to verify the domain.
- `verified`: Your domain is successfully verified for sending in Resend.
- `partially_verified`: One capability (send or receive) is verified while the other is still pending verification.
- `partially_failed`: The domain is verified but one of the features (send or receive) is not verified.
- `failed`: Resend was unable to detect the DNS records within 72 hours.
- `temporary_failure`: For a previously verified domain, Resend will periodically check for the DNS record required for verification. If at some point, Resend is unable to detect the record, the status would change to “Temporary Failure”. Resend will recheck for the DNS record for 72 hours, and if it’s unable to detect the record, the domain status would change to “Failure”. If it’s able to detect the record, the domain status would change to “Verified”.

## [​](https://resend.com/docs/dashboard/domains/introduction\#view-dns-records)  View DNS records

For each domain you have added, you can view the [DKIM](https://resend.com/docs/dashboard/domains/introduction#what-are-dkim-records) and [SPF](https://resend.com/docs/dashboard/domains/introduction#what-are-spf-records) configurations generated by Resend, as well as [DMARC protocol parameters](https://resend.com/docs/dashboard/domains/dmarc) under the **Records** tab.![Domain Details](https://mintcdn.com/resend/JHWt09hsc7E33HK2/images/dashboard-domains-resend.png?fit=max&auto=format&n=JHWt09hsc7E33HK2&q=85&s=feb6b86344d63199055cdaa7b15735fa)

Need specific help adding your records to a DNS provider? View our [knowledge\\
base DNS Guides](https://resend.com/docs/knowledge-base).

## [​](https://resend.com/docs/dashboard/domains/introduction\#configure-open-and-click-tracking)  Configure open and click tracking

Open and click tracking is disabled by default for all domains.You can enable it in the Resend Dashboard under the **Configuration** tab or programmatically.![Open and Click Tracking](https://mintcdn.com/resend/8slja5cHAobSwGo7/images/dashboard-domains-custom-tracking-domains.png?fit=max&auto=format&n=8slja5cHAobSwGo7&q=85&s=b94c649f1c22c899c144cd73ab5a8e73)Learn more about [open and click tracking](https://resend.com/docs/dashboard/domains/tracking).

## [​](https://resend.com/docs/dashboard/domains/introduction\#configure-enforced-transport-layer-security-tls)  Configure Enforced Transport Layer Security (TLS)

Resend supports TLS 1.2, TLS 1.1 and TLS 1.0 for TLS connections, but only requires TLS for sending when Enforced TLS is configured.By default, Resend will attempt to make a secure connection, but will fall back to sending messages unencrypted when the receiving server does not support TLS.You can configure Enforced TLS in the Resend Dashboard under the **Configuration** tab or programmatically. This means that if the receiving server does not support TLS, your email will not be sent.Learn more about [Opportunistic TLS vs Enforced TLS](https://resend.com/docs/knowledge-base/whats-the-difference-between-opportunistic-tls-vs-enforced-tls).

## [​](https://resend.com/docs/dashboard/domains/introduction\#custom-return-path)  Custom Return Path

By default, Resend will use the `send` subdomain for the Return-Path address. You can change this by setting the optional `custom_return_path` parameter when [creating a domain](https://resend.com/docs/api-reference/domains/create-domain) via the API or under **Advanced options** in the dashboard.![Custom Return Path](https://mintcdn.com/resend/JHWt09hsc7E33HK2/images/dashboard-domains-resend-custom-return-path.png?fit=max&auto=format&n=JHWt09hsc7E33HK2&q=85&s=569a75fc160aad18116efc93bcebe148)For the API, optionally pass the custom return path parameter.

Node.js

PHP

Python

Ruby

Go

Rust

Java

.NET

cURL

```
import { Resend } from 'resend';

const resend = new Resend('re_xxxxxxxxx');

resend.domains.create({ name: 'example.com', customReturnPath: 'outbound' });
```

```
$resend = Resend::client('re_xxxxxxxxx');

$resend->domains->create([\
  'name' => 'example.com',\
  'custom_return_path' => 'outbound'\
]);
```

```
import resend

resend.api_key = "re_xxxxxxxxx"

params: resend.Domains.CreateParams = {
  "name": "example.com",
  "custom_return_path": "outbound"
}

resend.Domains.create(params)
```

```
Resend.api_key = ENV["RESEND_API_KEY"]

params = {
  name: "example.com",
  custom_return_path: "outbound"
}
domain = Resend::Domains.create(params)
puts domain
```

```
package main

import "github.com/resend/resend-go/v3"

func main() {
	client := resend.NewClient("re_xxxxxxxxx")

	params := &resend.CreateDomainRequest{
		Name:             "example.com",
		CustomReturnPath: "outbound",
	}

	domain, err := client.Domains.Create(params)
}
```

```
use resend_rs::{types::CreateDomainOptions, Resend, Result};

#[tokio::main]
async fn main() -> Result<()> {
  let resend = Resend::new("re_xxxxxxxxx");

  let _domain = resend
    .domains
    .add(CreateDomainOptions::new("example.com").with_custom_return_path("outbound"))
    .await?;

  Ok(())
}
```

```
import com.resend.*;

public class Main {
    public static void main(String[] args) {
        Resend resend = new Resend("re_xxxxxxxxx");

        CreateDomainOptions params = CreateDomainOptions
                .builder()
                .name("example.com")
                .customReturnPath("outbound")
                .build();

        CreateDomainResponse domain = resend.domains().create(params);
    }
}
```

```
using Resend;

IResend resend = ResendClient.Create( "re_xxxxxxxxx" ); // Or from DI

var resp = await resend.DomainAddAsync( new DomainAddData {
   DomainName = "example.com",
   CustomReturnPath = "outbound"
} );
Console.WriteLine( "Domain Id={0}", resp.Content.Id );
```

```
curl -X POST 'https://api.resend.com/domains' \
     -H 'Authorization: Bearer re_xxxxxxxxx' \
     -H 'Content-Type: application/json' \
     -d $'{
  "name": "example.com",
  "custom_return_path": "outbound"
}'
```

Custom return paths must adhere to the following rules:

- Must be 63 characters or less
- Must start with a letter, end with a letter or number, and contain only letters, numbers, and hyphens

Avoid setting values that undermine credibility (e.g. `testing`), as they may be exposed to recipients in some email clients.

## [​](https://resend.com/docs/dashboard/domains/introduction\#export-your-data)  Export your data

Admins can download your data in CSV format for the following resources:

- Emails
- Broadcasts
- Contacts
- Segments
- Domains
- Logs
- API keys

Currently, exports are limited to admin users of your team.

To start, apply filters to your data and click on the “Export” button. Confirm your filters before exporting your data.If your exported data includes 1,000 items or less, the export will download immediately. For larger exports, you’ll receive an email with a link to download your data.All admins on your team can securely access the export for 7 days. Unavailable exports are marked as “Expired.”

All exports your team creates are listed in the
[Exports](https://resend.com/exports) page under **Settings** \> **Team** >
**Exports**. Select any export to view its details page. All members of your
team can view your exports, but only admins can download the data.

## [​](https://resend.com/docs/dashboard/domains/introduction\#what-are-spf-records)  What are SPF records

Sender Policy Framework (SPF) is an email authentication standard that includes all the IP addresses authorized to send email on behalf of your domain.The SPF configuration is made of a TXT DNS record that lists the IP addresses approved by the domain owner. It also includes an MX record that allows the recipient to send bounce and complaint feedback to your domain.![SPF Records](https://mintcdn.com/resend/JHWt09hsc7E33HK2/images/dashboard-domains-resend-spf.png?fit=max&auto=format&n=JHWt09hsc7E33HK2&q=85&s=630f500feba7768e05a69340e8a6dae5)

## [​](https://resend.com/docs/dashboard/domains/introduction\#what-are-dkim-records)  What are DKIM records

DomainKeys Identified Mail (DKIM) is an email security standard designed to make sure that an email that claims to come from a specific domain was authorized by the owner of that domain.The DKIM configuration is stored as a TXT DNS record that contains a public key used to verify the authenticity of the email.![DKIM Records](https://mintcdn.com/resend/JHWt09hsc7E33HK2/images/dashboard-domains-resend-dkim.png?fit=max&auto=format&n=JHWt09hsc7E33HK2&q=85&s=345d1dc6b7c138dbd92bd6928c634bd9)

## [​](https://resend.com/docs/dashboard/domains/introduction\#faq)  FAQ

Does Resend support 2048-bit DKIM keys?

No. Resend does not support 2048-bit DKIM keys. We sign outbound mail with
1024-bit DKIM keys, which are RFC-compliant, accepted by major mailbox
providers, and satisfy bulk sender requirements. Learn more about [DKIM key\\
length](https://resend.com/docs/knowledge-base/do-i-need-2048-dkim).

Was this page helpful?

YesNo

[Managing Unsubscribed Contacts\\
\\
Previous](https://resend.com/docs/dashboard/audiences/managing-unsubscribe-list) [Claiming a domain\\
\\
Next](https://resend.com/docs/dashboard/domains/claim)

Ctrl+I

[x](https://x.com/resend) [github](https://github.com/resend) [youtube](https://www.youtube.com/@resendlabs) [website](https://resend.com/)

Assistant

Responses are generated using AI and may contain mistakes.

![Domain Details](https://mintcdn.com/resend/JHWt09hsc7E33HK2/images/dashboard-domains-resend.png?w=840&fit=max&auto=format&n=JHWt09hsc7E33HK2&q=85&s=3feef54fa5b87f256d7a7f247bf82289)

![Open and Click Tracking](https://mintcdn.com/resend/8slja5cHAobSwGo7/images/dashboard-domains-custom-tracking-domains.png?w=840&fit=max&auto=format&n=8slja5cHAobSwGo7&q=85&s=f9a6c62193e849aa5eb228d154c3af58)

![Custom Return Path](https://mintcdn.com/resend/JHWt09hsc7E33HK2/images/dashboard-domains-resend-custom-return-path.png?w=840&fit=max&auto=format&n=JHWt09hsc7E33HK2&q=85&s=bddc91c1f027754433e5214d0089423a)

![SPF Records](https://mintcdn.com/resend/JHWt09hsc7E33HK2/images/dashboard-domains-resend-spf.png?w=840&fit=max&auto=format&n=JHWt09hsc7E33HK2&q=85&s=23232666700bb7832fba8de233c95130)

![DKIM Records](https://mintcdn.com/resend/JHWt09hsc7E33HK2/images/dashboard-domains-resend-dkim.png?w=840&fit=max&auto=format&n=JHWt09hsc7E33HK2&q=85&s=cd473e4cdd467d31c1e2d4a507f5d914)