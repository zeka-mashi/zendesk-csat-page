# Custom Zendesk CSAT Page

A simple, easy-to-use CSAT page for your Zendesk help center.

You get a generic template to serve as the CSAT survey page that is easily customizable to work with your help center's theme. Automatic population of survey text with parameters passed from your Zendesk setup makes it easy to feel more personal and human-like.

## Why?

This custom CSAT page was developed after running into a pretty big issue on Zendesk: **email crawlers were automatically clicking ratings** instead of the actual requester.

This happens when an email is received in an inbox that utilizes an email-scanning anti-malware/phising service. The email crawler will click on all links present in the email to determine if the email is safe or not. While that is a good idea for the end-user, it is not good for CSAT surveys which rely on one touch interactions.

The false negatives and false positives created inaccurate reports of ticket ratings -- reports that are critical to customer-centric visions in the support space. This is where I stepped in.

## Setup

The custom CSAT page utilizes Zendesk's Custom Page feature. By creating a separate page outside of the help article system, we can utilize much more in terms of page styling and scripting.

#### 1. Create a custom page in Zendesk

Under the theming page of Zendesk, go to the theme editor and click *Edit Code*. On the left side under Files, click *Add New* and choose *Custom page*. Name this page `survey`. The file should appear in Zendesk as `survey.hbs`.

Note: If you choose to name your survey page something other than `survey`, you will need to make adjustments to the JavaScript neccessary to allow this page to work.

#### 2. Copy the contents of `survey.hbs` to the new page

#### 3. Copy the contents of `style.css` to the `style.css` file in Zendesk

Note: Make appropriate adjustments if there are overlapping CSS.

#### 4. Copy the contents of `script.js` to the `script.js` file in Zendesk

#### 5. Change your automation trigger for sending survey emails

Instead of the default placeholder, `{{satisfaction.rating_section}}`, you'll want to replace it with this code:
```https://your-company-hc.zendesk.com/hc/p/survey?url_str={{satisfaction.rating_url}}&zd_req_str={{agent.first_name}}&zd_subj_str={{ticket.title}}&zd_id_str={{ticket.id}}```

#### 6. You're ready to go!

## Adding Parameters

If you would like to add additional parameters to pass through to the survey, such as your ticket's agent's name, you will need to adjust the `survey.hbs` and `script.js` files.

For example, you could add a new `span` element with an id of `agent-name` in `survey.hbs`.    
Then you would modify the automation trigger to include a new parameter to pass through, such as `&zd_agent_str`. The "agent" word here will be used for our parameter decoding.     
Finally, you would need to add a line below the "add additional below" comment in `script.js` with a similar line:    
`document.getElementById("agent-name").innerText = decodeURIComponent(getAllUrlParams().agent);`

## License

[GNU General Public License v3.0](https://github.com/zeka-mashi/zendesk-csat-page/blob/main/LICENSE)