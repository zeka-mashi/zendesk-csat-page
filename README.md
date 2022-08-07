# Custom Zendesk CSAT Page

A simple, easy-to-use CSAT page for your Zendesk help center.

You get a generic template to serve as the CSAT survey page that is easily customizable to work with your help center's theme. Automatic population of survey text with parameters passed from your Zendesk setup makes it easy to feel more personal and human-like.

## Why?

This custom CSAT page was developed after running into a pretty big issue on Zendesk: **email crawlers were automatically clicking ratings** instead of the actual requester.

This happens when an email is received in an inbox that utilizes an email-scanning anti-malware/phising service. The email crawler will click on all links present in the email to determine if the email is safe or not. The link crawler accesses each link from top to bottom in the email HTML structure. Since the "Bad" rating is by default after the "Good" rating, this causes the "Bad" rating to be the last updated satisfaction rating recorded for the ticket.

The false negatives and false positives created inaccurate reports of ticket ratings -- reports that are critical to customer-centric visions in the support space. This custom page adds in an additional level of customer interaction to prevent false negatives and false positives due to email crawlers.

## Demo

Check out a demo of the survey page [here](https://zeka-mashi.github.io/zendesk-csat-page/demo/index.html?url_str=https://your-company-hc.zendesk.com/requests/12345/satisfaction/new/a1b2c3d4e5f6g7h8i9j0?locale=1&zd_subj_str=Test%20Ticket%20for%20csat%20survey&zd_id_str=12345).

## Setup

The custom CSAT page utilizes Zendesk's Custom Page feature. By creating a separate page outside of the help article system, we can utilize much more in terms of page styling and scripting.

#### 1. Create a custom page in Zendesk

Under the theming page of Zendesk, go to the theme editor and click _Edit Code_. On the left side under Files, click _Add New_ and choose _Custom page_. Name this page `survey`. The file should appear in Zendesk as `survey.hbs`.

Note: If you choose to name your survey page something other than `survey`, you will need to make adjustments to the JavaScript neccessary to allow this page to work.

#### 2. Copy the contents of `survey.hbs` in this repo to the new page

Don't forget to add your company's name in place of `[Your Company Name]` and update the redirect link at the bottom!

#### 3. Copy the contents of `style.css` in this repo to the `style.css` file in Zendesk

Note: Please add a custom background image banner for the `survey-banner` class.

Don't forget to make appropriate adjustments if there are overlapping CSS!

#### 4. Copy the contents of `script.js` in this repo to the `script.js` file in Zendesk

#### 5. Change your automation trigger for sending survey emails

Instead of the default placeholder of `{{satisfaction.rating_section}}`, you'll want to replace it with this code:
`https://your-company-hc.zendesk.com/hc/p/survey?url_str={{satisfaction.rating_url}}&zd_subj_str={{ticket.title}}&zd_id_str={{ticket.id}}`

#### 6. Double-check the styling and function with a test and you're ready to go!

## Adding Parameters

If you would like to add additional parameters to pass through to the survey, such as your ticket's agent's name, you will need to adjust the `survey.hbs` and `script.js` files.

For example, you could add a new `span` element with an id of `agent-name` in `survey.hbs`.

Then you would modify the automation trigger to include a new parameter to pass through, such as `&zd_agent_str`. The "agent" word here will be used for our parameter decoding.

Finally, you would need to add a line below the "add additional below" comment in `script.js` with a similar line:  
`document.getElementById("agent-name").innerText = decodeURIComponent(getAllUrlParams().agent);`.

## License

[GNU General Public License v3.0](https://github.com/zeka-mashi/zendesk-csat-page/blob/main/LICENSE)
