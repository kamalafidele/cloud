const { JSDOM } = require('jsdom');

const htmlString = '<html><head>\r\n' +
`<meta http-equiv="Content-Type" content="text/html; charset=utf-8"></head><body><div dir="ltr">Hello Luke,<div>This is very helpful.</div><div>I'm pleased to be one of the selected people to start with this campaign.</div><div>I will happily join</div><div>Thanks.</div></div><br><div class="gmail_quote"><div dir="ltr" class="gmail_attr">On Wed, Aug 23, 2023 at 6:22 PM Happierleads Team &lt;<a href="mailto:happierleads_team@outlook.com">happierleads_team@outlook.com</a>&gt; wrote:<br></div><blockquote class="gmail_quote" style="margin:0px 0px 0px 0.8ex; border-left:1px solid rgb(204,204,204); padding-left:1ex"><div><div><h2>Hello Kamara fidele,</h2><p>We're conducting a campaign which encourages inclusive education and hiring process in our company. We hope you'll follow these rules.</p><p></p></div><img src="https://trail.happierleads.com/v3/webhooks/email-status/%3C169d0dd6-009e-4b6b-9742-7c959feb0d10@happierleads.com%3E/logo.png" style="display:none"> </div></blockquote></div></body></html>`

// Create a virtual DOM using jsdom
let textContent;
const dom = new JSDOM(htmlString);
const document = dom.window.document;

// Extract text content without HTML tags
textContent = document.body.textContent;
let to = '"Happierleads Team" <happierleads_team@outlook.com>';
const replacementMap = { '"': '' };
const regexPattern = new RegExp(Object.keys(replacementMap).join("|"), "g");
to = to.replace(regexPattern, (matched) => replacementMap[matched]);

console.log(textContent.split(to.replace(`"`, ''))[0]);
