> ## Documentation Index
>
> Fetch the complete documentation index at: [/docs/llms.txt](https://resend.com/docs/llms.txt)
>
> Use this file to discover all available pages before exploring further.

[Skip to main content](https://resend.com/docs/dashboard/api-keys/introduction#content-area)

[Resend home page![light logo](https://mintcdn.com/resend/w4S5Jr48MiquhhSH/logo-black.svg?fit=max&auto=format&n=w4S5Jr48MiquhhSH&q=85&s=630be7deea6ea94cc7fc4560ea60a5ac)![dark logo](https://mintcdn.com/resend/w4S5Jr48MiquhhSH/logo-white.svg?fit=max&auto=format&n=w4S5Jr48MiquhhSH&q=85&s=3843916235739ffb9cb1d24683221341)](https://resend.com/)

[Documentation](https://resend.com/docs/introduction) [Guides](https://resend.com/docs/knowledge-base/introduction) [API Reference](https://resend.com/docs/api-reference/introduction)

- [Sign In](https://resend.com/login)
- [Get Started](https://resend.com/signup)
- [Get Started](https://resend.com/signup)

Search...

Navigation

API Keys

Introduction

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

- Logs

- API Keys



  - [Introduction](https://resend.com/docs/dashboard/api-keys/introduction)
- Webhooks


### Resources

- [SDKs](https://resend.com/docs/sdks)
- [CLI](https://resend.com/docs/cli)
- [MCP Server](https://resend.com/docs/mcp-server)
- [Integrations](https://resend.com/docs/integrations)
- [Examples](https://resend.com/docs/examples)

## On this page

- [What is an API Key](https://resend.com/docs/dashboard/api-keys/introduction#what-is-an-api-key)
- [API key management](https://resend.com/docs/dashboard/api-keys/introduction#api-key-management)
- [View all API Keys](https://resend.com/docs/dashboard/api-keys/introduction#view-all-api-keys)
- [Edit API Key details](https://resend.com/docs/dashboard/api-keys/introduction#edit-api-key-details)
- [Delete inactive API Keys](https://resend.com/docs/dashboard/api-keys/introduction#delete-inactive-api-keys)
- [View API Key logs](https://resend.com/docs/dashboard/api-keys/introduction#view-api-key-logs)
- [Export your data](https://resend.com/docs/dashboard/api-keys/introduction#export-your-data)

[Learn](https://resend.com/docs/dashboard/emails/introduction)

[API Keys](https://resend.com/docs/dashboard/api-keys/introduction)

# Introduction

Copy pageCopy page

Visualize all the API Keys on the Resend Dashboard.

Copy pageCopy page

## [​](https://resend.com/docs/dashboard/api-keys/introduction\#what-is-an-api-key)  What is an API Key

API Keys are secret tokens used to authenticate your requests. They are unique to your account and must be kept confidential.You can use multiple keys to isolate different application actions to different API Keys. This allows you to [view logs per key](https://resend.com/docs/dashboard/api-keys/introduction#view-api-key-logs), detect possible abuse, and control any damage that may be done accidentally or maliciously.

## [​](https://resend.com/docs/dashboard/api-keys/introduction\#api-key-management)  API key management

You can view and manage your API keys from the [API Key Dashboard](https://resend.com/api-keys). You can also create, list, or delete your API keys using the [API](https://resend.com/docs/api-reference/api-keys/create-api-key), or the [Resend CLI](https://resend.com/docs/cli#api-keys).

## [​](https://resend.com/docs/dashboard/api-keys/introduction\#view-all-api-keys)  View all API Keys

The [API Dashboard](https://resend.com/api-keys) shows you all the API Keys you have created along with their details, including the **last time you used** an API Key.Different color indicators let you quickly scan and detect which API Keys are being used and which are not.![View All API Keys](https://mintcdn.com/resend/ABWmVTZIHGIFNTFD/images/dashboard-api-keys-view-all.jpg?fit=max&auto=format&n=ABWmVTZIHGIFNTFD&q=85&s=f195ef7f60a110407e2739f30c10ca2a)

## [​](https://resend.com/docs/dashboard/api-keys/introduction\#edit-api-key-details)  Edit API Key details

After [creating an API Key](https://resend.com/docs/create-an-api-key), you can edit the following details:

- [Name](https://resend.com/docs/api-reference/api-keys/create-api-key#param-name)
- [Permission](https://resend.com/docs/api-reference/api-keys/create-api-key#param-permission)
- [Domain](https://resend.com/docs/api-reference/api-keys/create-api-key#domain-id)

You cannot view or edit an API Key value after it has been created.

To edit an API key in the Resend Dashboard, click the **More options** button and then **Edit API Key**.![View Inactive API Key](https://mintcdn.com/resend/ABWmVTZIHGIFNTFD/images/dashboard-api-keys-edit.jpeg?fit=max&auto=format&n=ABWmVTZIHGIFNTFD&q=85&s=7abe8e055cf311a7f66a40477db7946a)

## [​](https://resend.com/docs/dashboard/api-keys/introduction\#delete-inactive-api-keys)  Delete inactive API Keys

If an API Key **hasn’t been used in the last 30 days**, consider deleting it to keep your account secure.![View Inactive API Key](https://mintcdn.com/resend/ABWmVTZIHGIFNTFD/images/dashboard-api-keys-view-inactive.jpg?fit=max&auto=format&n=ABWmVTZIHGIFNTFD&q=85&s=fa99650454696902100e03b669d3a9c1)You can delete an API Key by clicking the **More options** button and then **Remove API Key**.![Delete API Key](https://mintcdn.com/resend/ABWmVTZIHGIFNTFD/images/dashboard-api-keys-remove.jpeg?fit=max&auto=format&n=ABWmVTZIHGIFNTFD&q=85&s=9fc76ff5dc4cd38f465539cd3a435706)

## [​](https://resend.com/docs/dashboard/api-keys/introduction\#view-api-key-logs)  View API Key logs

When visualizing an active API Key, you can see the **total number of requests** made to the key. For more detailed logging information, select the underlined number of requests to view all logs for that API Key.![View Active API Key](https://mintcdn.com/resend/ABWmVTZIHGIFNTFD/images/dashboard-api-keys-view-active.jpg?fit=max&auto=format&n=ABWmVTZIHGIFNTFD&q=85&s=e0c0584545565e1e78e460b240d2c221)

## [​](https://resend.com/docs/dashboard/api-keys/introduction\#export-your-data)  Export your data

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

Was this page helpful?

YesNo

[Introduction\\
\\
Previous](https://resend.com/docs/dashboard/logs/introduction) [Managing Webhooks\\
\\
Next](https://resend.com/docs/webhooks/introduction)

Ctrl+I

[x](https://x.com/resend) [github](https://github.com/resend) [youtube](https://www.youtube.com/@resendlabs) [website](https://resend.com/)

Assistant

Responses are generated using AI and may contain mistakes.

![View All API Keys](https://mintcdn.com/resend/ABWmVTZIHGIFNTFD/images/dashboard-api-keys-view-all.jpg?w=840&fit=max&auto=format&n=ABWmVTZIHGIFNTFD&q=85&s=6c58f948de72898e3bc242a47d2355ea)

![View Inactive API Key](https://mintcdn.com/resend/ABWmVTZIHGIFNTFD/images/dashboard-api-keys-edit.jpeg?w=840&fit=max&auto=format&n=ABWmVTZIHGIFNTFD&q=85&s=8cf8b26efe7561a42514b8bc0b43661d)

![View Inactive API Key](https://mintcdn.com/resend/ABWmVTZIHGIFNTFD/images/dashboard-api-keys-view-inactive.jpg?w=840&fit=max&auto=format&n=ABWmVTZIHGIFNTFD&q=85&s=368afaea3ac78f34a894d1381d918367)

![Delete API Key](https://mintcdn.com/resend/ABWmVTZIHGIFNTFD/images/dashboard-api-keys-remove.jpeg?w=840&fit=max&auto=format&n=ABWmVTZIHGIFNTFD&q=85&s=ad1dc55cd2378a42a9b3e3760714c64e)

![View Active API Key](https://mintcdn.com/resend/ABWmVTZIHGIFNTFD/images/dashboard-api-keys-view-active.jpg?w=840&fit=max&auto=format&n=ABWmVTZIHGIFNTFD&q=85&s=f6a1617f1033ec13d63c49d6359c85be)