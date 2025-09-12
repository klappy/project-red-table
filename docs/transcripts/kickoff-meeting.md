### Meeting Purpose

- Review progress and clarify next steps for the "Project Red Table" data initiative, focused on identifying and tracking at-risk languages for ETEN's All Access Goals.
- Discuss the application of AI tools to automate and enhance analysis of language data, with the aim of supporting internal decision-making and reporting.

### Updates

- Chris is working on the first draft of the budget, using last year’s model with added detail for new responsibilities and projects [03:05].
- Peter confirmed the audience for the project is primarily internal (the lab and ETEN leadership), with a focus on identifying languages at risk of not meeting All Access Goals [10:26].
- Peter provided a comprehensive spreadsheet with multiple tabs, each representing filtered or derived views of the original Progress Bible data export [39:38].
- The project is being referred to as "Project Red Table," referencing the table of at-risk languages central to the initiative [27:54].

### Progress

- Peter has curated a multi-tab spreadsheet that filters languages by goal status, activity, and risk, culminating in a "red table" of 1,788 languages at risk of incompletion by 2033 [45:31].
- Chris and Peter clarified the derivation process for each tab, ensuring reproducibility and transparency for future data updates [41:34].
- The team has established a clear process for iterative analysis, starting with recreating existing manual outputs programmatically, then expanding with additional data sources and AI-driven insights [15:43].

### Timeline

- Chris aims to deliver the first draft of the budget and a proof of concept for automated data analysis by the end of the day, with flexibility for minor delays [03:27].
- Monthly data updates are planned, leveraging automated processes to refresh analyses with new Progress Bible exports [26:26].
- Weekly recurring meetings on Friday mornings are scheduled to maintain momentum and review progress [59:37].

### Blockers

- The historical data on project start dates is incomplete or unreliable, limiting the ability to analyze project timelines accurately [14:22].
- The current data is "fuzzy," and integrating new sources or refining risk assessments will require iterative development and validation [33:40].

### Risks

- The risk assessment is currently binary (at risk/not at risk); more nuanced, multi-factor risk scoring is desired but will require additional research and data synthesis [48:58].
- There is potential for project scope creep, especially with interest in reviving broader initiatives like SLI; the team is intentionally focusing on the "red table" to maintain clarity and impact [31:08].

### Action Items

- Chris to deliver the first draft of the budget and initial proof of concept for automated data analysis using Peter’s spreadsheet [03:27].
- Peter to provide clarification on spreadsheet tabs and ensure the source data format is consistent for future updates [36:16].
- Chris to explore integration of additional data sources (e.g., HDI, Rev 7.9) in later phases, after initial automation is validated [33:34].
- Peter to schedule and confirm recurring Friday meetings for ongoing project coordination [59:37].

### Next Steps

- Recreate Peter’s manual data analysis process programmatically to enable rapid monthly updates and reduce manual effort.
- Use AI tools to iteratively refine risk assessment, aiming to move from binary to multi-factor scoring as data allows.
- Develop a simple user interface focused on the "red table" for internal communication and decision support.
- Evaluate and potentially integrate additional data sources (e.g., HDI, Rev 7.9) in future project phases.
- Continue weekly check-ins to review progress, address blockers, and adjust priorities as needed.

---

Chat with your meeting and watch the full recording: https://app.fyxer.com/call-recordings/2674f5e6-5337-4494-b3b9-2b7a7a32014e:9082952d-e087-429f-ba4a-13797f641c10

[00:00] Chris Klapp:
past. Sorry. I hope you don't mind recording it.

[00:04] Peter Huang:
No, it's all right. I just. It was waiting for me to approve. Yeah. Yeah.

[00:12] Chris Klapp:
Since I'm not the owner, it waits for approval. Yeah.

[00:15] Peter Huang:
No, it's okay. Yeah.

[00:17] Chris Klapp:
I'll be using this to refer to later. Yeah.

[00:21] Peter Huang:
Yeah.

[00:23] Chris Klapp:
But, yeah, my cat started licking itself past the donut. I started doing research on the breed, like Russian Blues. Their body is so long and slender, it's almost impossible unless you do have a hard cone that their head can't get around. Yeah, yeah.

[00:42] Peter Huang:
Like, that's the thing is, like, same thing with our dog. Like, and it's just his. His, like, snout is too long.

[00:50] Chris Klapp:
Always.

[00:51] Peter Huang:
He can always get to his paw, no matter how big the. The cone is. Yeah. So it bothers. It's annoying.

[00:58] Chris Klapp:
Is it front paw? Yeah.

[01:01] Peter Huang:
It's his dew claw. You know, like, the thumb that's kind of up a little.

[01:06] Chris Klapp:
What happened?

[01:07] Peter Huang:
He must have smashed it on something outside or something playing when he was playing, but basically, like, it, like, split it in half and then, like, ripped half of it off. And then. And then I think, like, when he was licking it, I think he basically just, like, licked the other half off, and so now. He's just never gonna have a. Like a claw there again. It's just gonna be like a. A raw thumb, which is fine.

[01:32] Chris Klapp:
Yeah, it's not gonna hurt anything.

[01:34] Peter Huang:
Yeah, like, he doesn't need it, but it needs to heal, and he just keeps licking it so it won't heal. So. Hopefully he'll be all right. I mean, dog survive in the wild all the time.

[01:50] Chris Klapp:
Yeah. It was way worse. Yeah.

[01:53] Peter Huang:
And somehow they're fine. Yeah.

[01:55] Chris Klapp:
It's funny. It makes you wonder like either what have we done to make them, I don't know. Is it us that we think everything should be perfect for them? Yeah. Because they seem to have no problem with like injuries and they just go on. But we want everything to be like infection free and like but if they were out in the wild, they would have no care.

[02:21] Peter Huang:
Yeah, it's probably a mixture of, like, they would die more, but also, but also, like, human nature, you know, like, you. We want to make everything comfortable and. Yeah, cushy and stuff. So let's see.

[02:35] Chris Klapp:
You got the green shirt memo.

[02:37] Peter Huang:
Yeah, I got my. I'm supporting Chris.

[02:40] Chris Klapp:
I got the spring box. That's it.

[02:43] Peter Huang:
That's it.

[02:44] Chris Klapp:
Did John Deere get a new logo?

[02:47] Peter Huang:
Yeah, it does kind of. It's like. That's the one that Coos gave me. Spring box.

[02:52] Chris Klapp:
I'm gonna have to tell them. That's about your John Deere shirt. Yeah.

[02:58] Peter Huang:
John Deere. It does look like John Deere. Two exact same colors. Yeah.

[03:05] Chris Klapp:
Oh, well, I apologize. I have been trying hard to get to my first draft of the budget. So I'm just going to come clean and say this week has been nightmarish and catching up from still catching up from our weekend of in-person meetings. Yeah.

[03:26] Peter Huang:
So I.

[03:27] Chris Klapp:
I do plan on hoping that at the end of the day, I'll be able to have at least my first draft for you in the spreadsheet. Not that I haven't done any thought work on it and then done some related work to it, but I just haven't filled my tab out.

[03:44] Peter Huang:
Okay, if you could get it by, I mean, if you can get it by the end of today, that'd be great. I mean, if you need to have a little bit more time, that's fine too. At some point, you know, probably over the next week, I'm going to have to just put like some placeholders in there. Okay. Just if you don't end up getting to it. Yeah.

[04:08] Chris Klapp:
Well, my plan is using last year as a model. But then having just a little bit more detailed on it based on the things that I keep talking about doing with the other drivers that they want to put under my responsibility or my budget.

[04:25] Peter Huang:
Yeah, okay. Because last year is the only, I mean, you were out for the kidney.

[04:33] Chris Klapp:
No, that was two years ago. Was that two years?

[04:36] Peter Huang:
Yeah, two years.

[04:37] Chris Klapp:
Yeah, I hit my two-year mark and Yeah, I successfully ran my half marathon at my two-year mark. So that was my healing goal, was two years to get to a half marathon post-surgery. Yeah. I'm trying to believe it's been that long already.

[04:58] Peter Huang:
Yeah, I thought it was just last year.

[05:00] Chris Klapp:
No, last year I did make it to Belfast. Yeah. Yeah. No, last year somehow, I think in the, I don't have the proper term for it, except for dysphoria of working with some of the OBT tools. It made it a little bit easier just to say, you know, like shape this year's, this 2025 budget around the proof of Collins. Prototype MVP, Eten, and I feel like that's kind of going well, but I know this meeting isn't about that. So I'll talk to you. Hopefully we can have a meeting next week and dive in a little bit deeper on the details and you can help me take the my first attempt at putting numbers down and refining it for official numbers. Yeah.

[05:57] Peter Huang:
Okay.

[05:58] Chris Klapp:
You have no idea how stressed I've been about that this week though. Not a big deal.

[06:03] Peter Huang:
It'll be all right. Okay.

[06:04] Chris Klapp:
Well, good. That makes me feel better because like every evening, it's just like we either had something with church or, you know, taking care of the cat. We had our anniversary this week. And so I was like, all right. It'll be fine.

[06:19] Peter Huang:
It's not a, it's not like a, high intensity, high attention, high energy.

[06:30] Chris Klapp:
Yeah, but I just, I didn't want to put you in a bad position if I had an empty tab there.

[06:36] Peter Huang:
Well, I mean, I'm gonna, I'm gonna have to, like I said, at some point I'll have to fill some things in. Yeah. For the next few business days, but because I, I'm gonna have to start getting it back and forth with, with Dow soon.

[06:49] Chris Klapp:
Okay. Yeah, sounds good.

[06:51] Peter Huang:
But I'll be fine for now.

[06:55] Chris Klapp:
Well, that both relieves some stress off me, but I want to make sure I get that for you. At least something there for you.

[07:02] Peter Huang:
Yeah. Even if you just put some project names. Okay. Like bare minimum, that should be fine.

[07:10] Chris Klapp:
Yeah, sounds good. Okay.

[07:14] Peter Huang:
All right. I wanted to ask you about what it means and what you're thinking when we say like applying an AI tool or model or whatever to the, to like, right now it's effectively just a spreadsheet or like a couple of spreadsheets.

[07:39] Chris Klapp:
So my thought is we can clearly document your starting point, all of your starting data. And then we document how far you got with the tables and the charts. So if we basically have good snapshots of both of those, the starting point and the end point, then I can get my hands dirty of interviewing an AI about the data source and the data target. Right? Because you remember the last task for the sustainability assessment? I really didn't know where I was heading with that. I just worked with an AI to help me figure out where we were going with it. So it's going to be some back and forth interviews. I'll, you know, if we can document what we have or where we want to go, I'll just keep iteratively working with different AIs. So like last time, I started off taking the meeting transcript that we had with you, Dow, Steven and myself. Remember that meeting? And then Dow basically outlined what he was hoping for. So I use that recording as this transcript, I copied and pasted it regularly to my AI, like, hey, here was the original task. Are we on target? Where do you feel like we're falling short? What could we sharpen up? And each time it would come up with something new. And so it would iteratively help me come up with something better, a better refinement, something that aided us in, in the target goal. Now, Dow had this very clear, like, this is the very succinct audience is basically going to be the acceleration subcommittee and the steering committee. That's the target audience for that project, right? And knowing what I've delivered for them in the past, it was very clean, clear, concise. So I'd like to define who the target audience of this is. And right now it's just internal is my understanding. Like this is our, we're going to be laser focused internally of how do we use this, this whatever output is. So we know what are the languages we're running after, right? Yeah. Starting point is a basically a list of all languages and how do we get it down to which ones we're going to focus on?

[10:26] Peter Huang:
Yeah, I think the audience is the lab. I think it's also E10 internal. We could like the steering committee, you know, effectively representing E10. And yeah, we are trying to assess the languages that are at risk of not completing the all access goal. So we have all the current data that's been submitted And then we, I don't have it in the same spreadsheet, but I can export work records that show work based on the language. Oh, really? Yeah. But there's millions of them because it's all the languages and it's like every project that's ever been done is a separate record.

[11:21] Chris Klapp:
So that's good. I was wondering if there would be historical data for that. And that comes with like timestamps of when things were done.

[11:31] Peter Huang:
I don't know how granular it is, but I don't know how accurate it is, but yeah, they have things are dated. I just don't know if it's how accurate it is.

[11:43] Chris Klapp:
Yeah, that's fine. Because we know there are clear problems and we can tell the AI. Hey, here's the data we have. My thought is we can use this type of data to help inform similar projects, right? Like, hey, here's a project. Can you find some related projects through whatever means you feel that are related, whether it's in the same cluster, the same region, the same organization, whatever those vectors are that would make this language related to another, find out how long those projects took. Right? Like if SIL is working in the same region on the same cluster using the same process, and it took 12 years to get that done, and we have no reason to believe that they're going to use something else. We realize they're only two years into it. They got 10 years left, right? So That's just the thing that my brain has been percolating is potentially using that type of data for predicting how long an organization might take. Now, that's not saying that we think they're going to take 12 years, I don't know. But maybe we could raise the flag and then look a little bit deeper.

[13:03] Peter Huang:
Yeah, I mean that's the kind of thing that I'm hoping we can do. That sounds, that sounds right.

[13:08] Chris Klapp:
Yeah, but I'll admit, I have no clue how we're going to do that.

[13:13] Peter Huang:
Yeah. Okay, so.

[13:17] Chris Klapp:
But for now, my, here's my 1.8 million.

[13:24] Peter Huang:
They have 1.8, 1.85 million engagement records. Wow.

[13:30] Chris Klapp:
Okay, so what is, what is an engagement record? Any, any, like the update?

[13:40] Peter Huang:
No, any, any work or project or any type of work being done, they put an engagement record associated with the language. So like if, if SIL is just doing language development, they'll put a record that just says language development. If SIL is doing translation, they'll put a a new record, a new engagement record that says translation.

[14:07] Chris Klapp:
Okay, so we might actually be able to look at the data to find out if somebody got started, how long before they do language development and then how long till they finish language development and start the translation, that kind of stuff. Maybe.

[14:22] Peter Huang:
Yeah, the problem is they have The data is really spotty on the start date.

[14:34] Chris Klapp:
Yeah. Okay, that's fine. What we can do is chalk this up for, hey, we know we have this data, but we're not ready to engage with this data yet. So for now, what I'd like to do is spend the first week or two recreating what you've done, but through a programmatic AI way. So phase one is let's recreate what. What you did in an automated way. So if we download a new snapshot from progress.bible, we can instantly run these numbers again.

[15:09] Peter Huang:
How's that sound? Yeah, yeah, that's fine. I don't know. I just. I don't know exactly how we're gonna apply. I don't know how the AI works. So if we can learn something, that'd be great if it helps us to analyze. But the data itself is, it's a lot, you know, like there's gonna have to be, I don't know how it gets ingested, like what you, if you need me to send you certain things or what?

[15:43] Chris Klapp:
Well, like at first, what it, what is the data spreadsheet that you used? Right? So I'll need a copy of that.

[15:53] Peter Huang:
That's just okay.

[15:54] Chris Klapp:
So I'll build a proof of concept by taking that data and figuring out how we can sit on top of that to build like a web UI version of your, your, your outcome tables in charts.

[16:09] Peter Huang:
All right, I'm going to send, I'm just going to email you a copy of it. Okay. Because it should have basically everything in it. But it's. It's like my. My thing is just the all access goals. Yeah, let me see if I can find it. I may not even know where I. Where I saved it. Okay, all. I'm just gonna email you a copy.

[16:41] Chris Klapp:
Okay, yeah, that's fine.

[16:45] Peter Huang:
So this is just the language information that Progress Bible has.

[16:52] Chris Klapp:
Okay.

[16:53] Peter Huang:
So there's a few different reports and then they have different fields. Because you think the all access school report, the unique identifier is the language. Or the language code. But if you're looking at a work records report, the language or language code is not a unique identifier because each language could have dozens and dozens. Some of them have hundreds of work records. So the identifier there, unique identifier, there's going to be like the, I don't know. I don't even know what it would be. Something specific to the project.

[17:32] Chris Klapp:
Yeah. Okay.

[17:33] Peter Huang:
But so there's a couple different reports like that. There's another report that has like, that's called like maximum scripture and it's like every, every scripture related product that those languages have, at least on record. So so yeah, there's like, I mean, there's a handful of like reports and different things that we could feed in and ask them how to, you know, ask the AI how to look at these things together. There's something called like paradigm comparison reports. There's remaining needs report. There's velocity and acceleration dashboard.

[18:26] Chris Klapp:
Oh, wow. So, okay, so they have more than I thought they had.

[18:31] Peter Huang:
Yeah, they have a bunch of stuff.

[18:33] Chris Klapp:
Okay, so my thought is, you know, we focus on recreating what you did in the first couple of weeks. And then if we can assess and collect all the data, like types of data, or at least an overview of what's in each data source, then Tim and I can actually research and try to figure out which ones we wanna correlate together or the other drivers we're using Tim to help us research this. Which data sources we're gonna like rotate in to help us assess which ones are most at risk, right? So, 'cause I feel like yeah, we won't know until we just get something started, right? Which you've got a good starting point for us to replicate, and then we would iteratively grow from there using new data and injecting new data. So basically, I'm planning to leverage AI at first to help us understand what data is available and how to build an interface that's usable, that helps bring value to us. Then once we build something, then together we can look at it, poke at it, and then say, I wish it did this. Then we can use AI to add that. That's the value of AI. It's almost like we have our own progress.bible or rev79 working for us. It can help us create our own dashboard in weeks to months instead of years.

[20:19] Peter Huang:
Yeah. Yeah. I mean, that sounds great. That all sounds good. Like, that would be. That would be nice to have. Okay. I'm less worried about the interface until at least, like, step two or three, you know, but it'll. It will still be nice to have at some point.

[20:41] Chris Klapp:
Well, the reason why I feel like that's important is that it's a communication easier for sure.

[20:50] Peter Huang:
Correct.

[20:51] Chris Klapp:
Yeah. It's an anchor point that we can all look at and touch.

[20:54] Peter Huang:
Yeah, exactly. Yeah. It's orienting, I guess, when you're communicating.

[21:02] Chris Klapp:
And when we're looking for something, it's also a starting point for us to Add new vectors of data to to see how it impacts our table, right? If our table is showcasing which ones are most at risk, then a new source of data might impact our risk factor. So, I don't know, I feel like because there's so many different sources of data, it's almost like everything will likely have to, go into a single number, like thinking about Dow, the way Dow thinks and the way Dow has asked me to present anything I work on for the committees. If it isn't simple, it's too much, right? Like everything has to be clear, concise, like we need a single one pager to hand in, and that one pager better be clear and understood at a quick glance. Without any complex deciphering.

[22:05] Peter Huang:
Right. Yeah.

[22:05] Chris Klapp:
In my mind, I feel like everything needs to boil down to like a single risk number for each language. And then we would be able to group and aggregate that risk number. So like no matter what data sources we have, somehow for each language it boils down to each language has its own risk number. Whatever that risk factor is, right? However we grade it, however we factor everything in. And then we roll them up into those categories, kind of like we did with the sustainability of tools. Like there's the most at risk, there's the least at risk, and then there's a whole bunch in between, right? I don't know what gradients, if it's going to be a 1-2 or 3, or is it, do we need a 1-10 with that, right?

[22:55] Peter Huang:
Yeah. Yeah. Those are the kinds of things that I think I like and I can definitely help with is analyzing all the data points to help assign and clearly simplify, like you said, and then communicate or visualize the, the data in a, on whatever kind of sliding scale we decide. So, yeah, I'm good with the interface. I guess my hope, my whole point was that the first thing is I want to make sure we're figuring out what we're measuring and what we're trying to display and all that. And then we can, yeah, for sure. Like, it'll be helpful to have a simple, simple interface, but, yeah, make sure we get the we get the data right first or what we're looking for, right?

[23:50] Chris Klapp:
No, that makes sense, yeah. And so yeah, you're right. So we need to tease out like interface from are we getting, are we analyzing the data correctly and are we generating the right outcomes, right? The right is the, What's the term I'm looking for?

[24:14] Peter Huang:
Are we asking the right questions?

[24:16] Chris Klapp:
Yeah, yeah. Are they not the artifacts? Maybe it's the artifacts, maybe that's the term. The artifacts, the outcomes, the objectives, right?

[24:25] Peter Huang:
Yeah.

[24:25] Chris Klapp:
Is that on track? And I feel like using an AI can help us create an interface for those two things of how we analyze data and drive those so that we can iterate more quickly. Does that make sense? So the user interface to me is a tool to help us speed up this iterativity loop, the loop of making sure we're understanding the data well enough to derive the right, ask the right questions, right?

[24:57] Peter Huang:
Yeah.

[24:58] Chris Klapp:
And I have no idea. Technically, you're right. We could do it without a user interface.

[25:06] Peter Huang:
And well, I'm happy for a user interface. I just figured we would push that to step two, kind of.

[25:19] Chris Klapp:
Yeah. I'll think about that some more. Because normally I would say yes. I feel like what you've done though is kind of help do that without an interface. I don't know how I would visually convey the outcomes as much without some sort of interface. So I feel like to me it's a tool for communicating with the rest of the team, what the AI is doing behind the scenes. Yeah.

[25:49] Peter Huang:
Okay. Well, that's fine then. If you want to do it.

[25:52] Chris Klapp:
It won't be fancy. It won't be fancy. Yeah. So the other thing is, Yeah, so the UI itself isn't the priority, it's the outcomes, right? Let's see. So yeah, I'm thinking phase one, we focus on recreating what you've done to make sure if you get a new data dump snapshot, all we have to do is re-upload the file and then it's automatically done, right? So anytime we get a new download from progress.bible, yeah, that'd be nice.

[26:26] Peter Huang:
Because if you basically just had exactly like the AI could apply all of the changes made, Fyxer's Bibles data uploads or it updates once a month. So at the same time every month, we could just re-upload the file or whatever it is and then get the same kind of representations, the same kind of filterings, the same kinds of slicing.

[26:55] Chris Klapp:
So at bare minimum, that's my goal. Yeah, that's my tier one. My first goal is recreatability of what you've done so that each month we're always up to date without spending weeks refining the data again. Yeah. And then from there, then we inject more data.

[27:17] Peter Huang:
I think we inject more data and we talk about what we're trying to learn based on kind of maybe a few different data fields that we have access to, to see what specific kind of indicators of what's on pace or what's not on pace and what that means and all that. And then having some sort of interface that is at least understandable would be cool. I guess that would be helpful. Yeah. Okay.

[27:54] Chris Klapp:
Yeah. I'm calling it for right now, I'm calling it Project Red Table. Since Mark kept calling it, you know, bring back the Red Table. And he kept riffing. I think he used the term Red Table like 10 times that day.

[28:10] Peter Huang:
What was he talking about? Bring back the Red Table? I don't know.

[28:15] Chris Klapp:
You had, right, the different tables. He had four tables. There was three. And then the fourth one was Shades of Red.

[28:24] Peter Huang:
Oh, yeah, yeah, yeah.

[28:25] Chris Klapp:
Like, so everything to him, he was so excited about the red table. Just show me the red table. Can you go back to the red table?

[28:32] Peter Huang:
Yeah, yeah, yeah. I kept thinking he was, like, when you said table, I think you're talking about, like, an affinity table or whatever.

[28:40] Chris Klapp:
I thought, I thought he was talking about we need to create a new. Affinity table for people dedicated to the most at risk aags. And so I asked them in between one of our sessions, you know, our sessions, I was like, so when you say red table, are you talking about, like, the shades of red on the table on the screen, or are you talking about starting an affinity table around this? And he's like, oh, that's not a bad idea. But I was just talking about, you know, the table full of red colors. Yeah.

[29:09] Peter Huang:
The. Yeah. Okay. Yeah. In my mind, you know, I was thinking, like, project tripod. It's like a piece of furniture. And then I was thinking, project red table is like a red piece of similar.

[29:25] Chris Klapp:
Yeah.

[29:27] Peter Huang:
Where did you get red table from?

[29:29] Chris Klapp:
But, yeah, you see Andy's logo?

[29:31] Peter Huang:
Yeah, that's that.

[29:36] Chris Klapp:
Yeah, and even more reason to think that.

[29:39] Peter Huang:
But that makes more sense now. Where did he put that? I want to look at it again.

[29:46] Chris Klapp:
Yeah, I'm going to save that. That's going to be the apps fave icon. I don't remember where he put it.

[29:52] Peter Huang:
Maybe in random.

[29:54] Chris Klapp:
No, I thought it was in in-person meetings.

[29:57] Peter Huang:
Oh, yeah, it might be there.

[30:00] Chris Klapp:
I'm sorry, not in-person meetings. It was a Weekly meeting. Weekly meeting. Weekly meeting. Yeah.

[30:07] Peter Huang:
Nice little red table.

[30:11] Chris Klapp:
Yeah. So that's going to be the logo for the app. That's a good one.

[30:17] Peter Huang:
Yeah.

[30:19] Chris Klapp:
Yeah. Thanks, Mart.

[30:21] Peter Huang:
Because the red table. The red table in the spreadsheet represents the at risk languages.

[30:31] Chris Klapp:
Yeah. I mean, that's what we're after, right? And it's memorable. And this is what calling it Project Red Table helped me rein Tim in. But like the only thing we care about right now are the at risk languages, right? So it's, I know you have a million data sources that you want to do million things you want to do with this. Because he was diving in. For him, this is a partial revival of the SLI, the strategic.

[31:03] Peter Huang:
That's actually a problem that we have to mitigate.

[31:08] Chris Klapp:
Yeah. So I let him know this is not a revival of the SLI, but I'd like to tap into your experience in all the research you've done with the SLI. But we need to be laser focused on the red table. So that's why, for me, calling it red table, it helps everybody stay focused on. There's so many things we could do with this data, but right now, the only thing we care about is what is the red table?

[31:33] Peter Huang:
Yeah. Yep.

[31:35] Chris Klapp:
So to me, the most simple user interface, the homepage, is going to be that red table. That's it. In my mind, that's all the Simplicity. Like, you go here, there's tons of data behind the scenes, but all you see is this red table. That's the simplicity, right? That's the table Mark has seen. Everybody's behind that red table. It's simple. It's just a little Excel, you know, for, you know, what is it, the four by two or something, right?

[32:08] Peter Huang:
Yeah.

[32:08] Chris Klapp:
And it's just like categorical types and then how many languages in that category? Yeah.

[32:17] Peter Huang:
We might do like, four by three or something. Yeah. And we might just add, like, chapter count, because I know more. Mark, he loves that chapter count. Yeah, chapter count. Even though that's such a hard thing to. People have tried to convince him over and over again to stop caring about chapter count because it's not accurate. And he's like, no, I want the chapter count.

[32:39] Chris Klapp:
Like, all right, fine. Hey, for him, it. It's. It's meaningful and tangible, right? Like, it's. You can fund chapters, but you can't, you know, it's easier to kind of talk about that and correlate that and motivate people on chapters from an external perspective. Internally to E10 chapters is like, oh, yeah, everybody hates it. But everybody externally, like, when I tell my family about, like, how it's measured by chapters, like, oh, yeah, that's smart.

[33:06] Peter Huang:
It makes more sense to people.

[33:08] Chris Klapp:
The people who aren't in the field. Yeah.

[33:11] Peter Huang:
Yep. Okay. Well, so do you need anything else from me? I mean, at some point, we can sit down and maybe go through Progress Bible and look at all of the stuff that they have for us to export. And then I don't know if we want to get into, I know you were saying maybe wait a little bit before adding other data sources, but we'll have Rev 7.9 access at some point too.

[33:34] Chris Klapp:
Yeah, that'd be good.

[33:36] Peter Huang:
We can hold off on that. Unless you would like to start that in.

[33:40] Chris Klapp:
I'm gonna need to- Like for this first pass, I just want what you used for your- okay. Everything else will be icing or just 'cause remember we're starting from, we know the data's fuzzy. So I want this to be our first snapshot. I need to make sure I can recreate what you did. Then everything will be an additional refinement to sharpen the data. We know it's fuzzy. And every new data source, AI is just basically going to guide us on how we factor that in. But most likely I'm not using AI in the end product. AI is just helping us jumpstart and get there as quick as possible. Yeah.

[34:26] Peter Huang:
Okay.

[34:26] Chris Klapp:
That doesn't mean we couldn't, like I have this long-term vision of 2026. Let's partner with, if this is important, let's partner with progress.bible and rev79 to build MCP servers for that data source so we can actually more readily and more quickly query real-time data from them without having to wait or without having to do large dumping snapshots. Let's have this interface and additional augmented live view.

[35:05] Peter Huang:
That would be cool as a long term goal if things work out here. So we're just doing a pilot now.

[35:12] Chris Klapp:
To me, we got to build this pilot first and then I'm going to put on my budget some money and some of the projects will be a project red table, which would include building MCP servers. I'm partnering with Rev 7 9 and project.bible sorry progress.bible and whoever else to make sure we're feeding real-time data.

[35:39] Peter Huang:
Yeah, okay. Yeah, that sounds good. I appreciate you thinking to even just put a small amount, even if you just put a small amount for like experiment in your budget, that would be Still good to have it in there.

[35:54] Chris Klapp:
Yeah, sounds good. All right, well, I think you can make sure I get the files.

[36:06] Peter Huang:
I just emailed you the spreadsheet that has everything.

[36:10] Chris Klapp:
That's fine. Do you have the one you started with versus the one you ended with?

[36:16] Peter Huang:
Yeah, the spreadsheet has multiple tabs. So the first tab has all languages, and the second tab has all languages goal not met. Then the third one has all active, like, active projects, and then the next one is no, like, where it's not active. So there's, like, seven. There's, like, six or seven tabs on there. I can. I can explain what each one is if you need more clarity on it, but. It's broken out already. Okay.

[36:50] Chris Klapp:
But what did you receive? Because I'll have to know what is the original file that you opened versus what did you curate and add and improve?

[37:02] Peter Huang:
The original file is the first thing on there. It's every all access goal language.

[37:06] Chris Klapp:
Oh, so the first tab is the original file.

[37:10] Peter Huang:
Yeah, the first tab is like the source data.

[37:14] Chris Klapp:
Okay.

[37:16] Peter Huang:
And then every tab after that is just a filtering. It's some manipulation of that first tab.

[37:24] Chris Klapp:
So if we were to download the data next month, basically all you'd get is the first tab.

[37:29] Peter Huang:
Yeah. Okay.

[37:30] Chris Klapp:
That's good to know.

[37:31] Peter Huang:
Yeah. I mean, I might have to go back and make sure because the Yeah, I'll have to make sure that there aren't like a few things in there automatically added that I might be missing. But yeah, it should be format wise. It should be basically the same as the first tab.

[37:54] Chris Klapp:
And because we're using AI to help us get there, if things change, it's not a big deal. But if we had a human development team and we baked those assumptions into whatever we build, It is amazing. The cost impact of pivoting is much smaller and faster.

[38:17] Peter Huang:
Yeah, which is great. Yeah. So I emailed it to you. Yeah, that first tab is the exact, well, shoot, I actually haven't even looked at it. I don't think I removed anything. Yeah, I didn't remove any data or any columns or anything like that. So it still has all the dumb like Eten data and stuff that nobody even.

[38:43] Chris Klapp:
So do you mind sharing your screen and just maybe give me a paragraph or two or a 30 seconds to a minute overview of each what you did when you received it. Like data that's there and then how you got to the next tab.

[39:09] Peter Huang:
Yeah. And your AI is taking notes on that.

[39:14] Chris Klapp:
Yeah, it's taking notes. So anytime you can maybe describe what you're pointing at and not assuming that the AI won't be able to see, or at least the way I'm planning on using it is just it's only the transcription that we're uploading. So.

[39:38] Peter Huang:
Okay, so right now I have the spreadsheet open and on the first tab that's called AAG languages, that is the that is the original data with every field that comes when you export this from Progress Bible. Right now on this first tab, it has every single language that has an all access goal. It's somewhere in the 5,000 something range. I can't remember exactly. 5,900. So this is every language that has an all access goal on the first tab. From this list, on the second tab, I just filtered out anything where the goal is met. So on the second tab that's called AAG goal not met, it is all languages with an all access goal where the goal is not met. Then the third tab is all of the languages where the goal is not met that have that are showing they have active work happening. That's in the third tab. In the fourth tab, it's all languages that have no activity reported right now. Okay. In the fifth tab, well, it's filtered down right now, but in this fifth tab, it is There we go. This is languages where the activity is either language development or scripture engagement only, as in it doesn't have translation activity happening. So these ones we would consider high risk of incompletion because there's no translation activity happening.

[41:34] Chris Klapp:
And each of these tabs, including that one, are all derived from data in the first Tab.

[41:42] Peter Huang:
Yeah, it's all just derived from the data in the first tab. Good.

[41:46] Chris Klapp:
So you did some filtering and basically copied and pasted it into a new tab.

[41:50] Peter Huang:
Or it's iterations based on like this one down to this one down to left to right or some of them like active and no active are binary inverse. Yeah. Yes. Cool.

[42:02] Chris Klapp:
Okay. So now you're the AAG active translation tab.

[42:06] Peter Huang:
AAG active translation tab. This is This is any language that shows it's active and the type of work includes translation work. So this is also funny, this language.

[42:23] Chris Klapp:
Yes, that's the language code.

[42:26] Peter Huang:
It's Pullo.

[42:28] Chris Klapp:
It actually has nothing to do. I know. Where did those letters come from?

[42:35] Peter Huang:
Exactly. It makes you wonder where it came from because all the other ones kind of match or at least, oh, here's one that's not be.

[42:42] Chris Klapp:
One of the things I learned is, like, each language has, like, two to 12, like, different ways to say the same language.

[42:51] Peter Huang:
Yes. Yeah. Or, like, a language that might be on the all access list might actually have four different dialects. And that's just like the mother kind of the umbrella term is the one they have in there. I mean, there's just stuff like that that. It's like nobody knows unless you get it.

[43:10] Chris Klapp:
Okay, so even these languages, we may have highly relevant related languages that are dialects of each other or.

[43:18] Peter Huang:
Yeah, maybe or sometimes what I've learned is that the language that's on the list is representative of multiple dialects. And so whoever's doing the project has to make a choice of which one to do the translation in.

[43:34] Chris Klapp:
Okay. Yeah.

[43:35] Peter Huang:
So that kind of stuff that you don't know until you.

[43:37] Chris Klapp:
You may be doing a dialect. It represents. It's like a. Like choosing Arabic first.

[43:44] Peter Huang:
Maybe almost like a cluster or something. Yeah. Yeah.

[43:47] Chris Klapp:
You're starting with one. It's more understandable by others than. Than the other dialects. Yeah.

[43:54] Peter Huang:
A lot of that is just like field of research that is unknown. All right, this. This next. Tab AAG risk of incompletion. This is just a curation of the previous of the data from the previous tabs that shows anything where I initially deemed it as being at risk of incompletion.

[44:16] Chris Klapp:
So that may include both active language development and translation.

[44:21] Peter Huang:
This would include anything that is inactive or no activity. As long as it's a New Testament or full Bible or greater. Because if something's a portion, then I took that out because portions could still, they're not really at risk because they could be finished quickly. So it's anything with no activity. And then it is, it's also things with activity where it's language development or scripture engagement only because no translation is happening. So I included those on there. Okay. And it also includes the ones that are active translation. As long as they're a New Testament or greater goal. And that's just because those need to be analyzed to see if they'll if they're actually on pace. Yeah.

[45:09] Chris Klapp:
So they're basically we we'd rather start with a bigger number. Exactly. All these are at risk because we have no data. We actually don't know for sure if they're on track. So we're just going to say they're at risk. Yes. We haven't had a chance to assess if they are if those risks are mitigated already for us.

[45:31] Peter Huang:
Yes, exactly, because the red table was Dow's worst case scenario based on this. This is worst case scenario. This is the red table. This is the data of the red table is AAG risk of incompletion.

[45:45] Chris Klapp:
Now, these are also, I'm just restating what I- 1788.

[45:51] Peter Huang:
Okay.

[45:52] Chris Klapp:
Yeah. What I understood you saying just now is also this. This includes all. All access goal needs not met, that both have no activity at all, or also that have language development activity that are not chapters. Right?

[46:17] Peter Huang:
Like, it's not the 24 chapters.

[46:19] Chris Klapp:
The New Testament to.

[46:20] Peter Huang:
It has non, yeah, non-translation activity and not portions goal. So New Testament goal or full Bible.

[46:29] Chris Klapp:
Full Bible or two full Bibles, which is just a handful.

[46:33] Peter Huang:
Yeah.

[46:34] Chris Klapp:
And then for the, it also includes active translation if it's a full Bible or New Testament, right? Yes. We don't know what speed they're going at just because they're started and there's an active translation. Sometimes they say it's active, but we don't know if they had any progress at all. Yeah. And what the progress pace is. Exactly.

[46:56] Peter Huang:
Exactly. Because we have no idea what pace is or progress or status.

[47:02] Chris Klapp:
So the only thing that can really get things out of this red table, I think this is the highlight for the AI, right? Or for the AI or whoever's listening and reading this transcript later. One of the most important things that we can learn here for when we add new data to this, the biggest thing, the only thing that matters is what sharpens the data to mitigate the risk or help us understand if there's not a risk of incompletion that showcases that there's enough progress or rate of progress The current progress, if we have data that shows us the progress rate is enough to be done on time. Yes. With that buffer. Exactly, yeah.

[47:54] Peter Huang:
We're looking for data or some way of analyzing data that gives some sort of indicator of pace such that the projects can be finished by 2033.

[48:07] Chris Klapp:
So this is where right now it's binary. Right? It's just, it's at risk. So technically, if something is 99 done, it could still be on this list. Still at risk. Right? Because what happens if it's 99 done and there's no team left to like something, the team got martyred or killed in the Civil War or whatever's going on, and there's no team to finish that last chapter. Exactly.

[48:35] Peter Huang:
Yeah.

[48:36] Chris Klapp:
There's so many factors and risks there, not just the percentage of completion, but somehow rates and continued progress is or a gap in time of the last update. All of those factors and vectors would help us get into from going to a binary yes or no risk of incompletion to some sort of grading scale of 0 to 1.

[48:58] Peter Huang:
Yeah, yeah. If we could get there at some point, that'd be great. I would love that. Right now we're just going binary because that's the easiest way to analyze. But definitely sliding scale, definitely multiple factors of understanding. This one's at risk because of politics. This one's at risk because of war. This one's at risk because of work. So it's because of number of Christians. Those are things that will take research. Yeah.

[49:34] Chris Klapp:
That's actually important for a potential user interface of right now, whether or not we come up with a going from yes or no to a sliding scale 0 to 1, we can actually just list the things that factor into why it's a risk. Yeah. Because we can't do as a lab, we can't do 1788. No, no. So we've got to figure out out of those 1788, which ones do we prioritize and focus and why? So I think what you're saying is not just a zero to one, like, oh, these are the most at risk, but we don't know the factors. I think, like you're saying, I think this is a big revelation in the interview. Is knowing the tags, almost like categorical types of risk factors, are actually really important. So what if we had some sort of way to showcase all of the types, major types of risk factors that we could actually explore, and there would be a second breakout of this table that would show all the categories of types of risk?

[50:50] Peter Huang:
Yeah.

[50:51] Chris Klapp:
In the numbers for each of those types of risk.

[50:53] Peter Huang:
Yes, exactly. Something like that would be incredible.

[50:56] Chris Klapp:
But to me that's like, because you can actually have action on that, right? Yes.

[51:01] Peter Huang:
Like it'd be so much more actionable. Yeah. You could have a lot of actually useful information, but I do think that that would be more like a phase two or iteration four or whatever. But that's the kind of usefulness that would be great to get to eventually.

[51:22] Chris Klapp:
I agree. I think that would be amazing. But like you're saying, we don't have the data for any of that right now.

[51:32] Peter Huang:
At least not collated and not synthesized and analyzed in the way it needs to be to indicate those.

[51:42] Chris Klapp:
Some of the easiest things to do If we were to have one factor would be the HDI, which is almost just a proxy for some of those factors. The Human Development Index could actually correlate between the language and its countries. Human Development Index can actually give us some proxy for some of that. So I think one of the quickest, easiest ways for us to simulate some of this is bring in that one number.

[52:11] Peter Huang:
Yeah, that's actually true for sure. And if we wanted to get granular, you know, the HDI breaks down into different categories like because like because like infrastructure could be one thing, violence could be one thing, but that yeah, that HDI does do like subcategories as well. I just don't we want to get that that granular. Yeah.

[52:33] Chris Klapp:
Yeah. Okay. Well, that's good to know. Yeah, that's very helpful. So we skipped from risk of completion to the stats table. So we got the four tables, the three tools that correlate some of your previous spreadsheets of the same name and breaks it down into the groupings, how many languages are in each, whether it's full Bible, New Testament portion for Yeah.

[53:04] Peter Huang:
It's exactly, yeah. This is just count of the of the data from the previous tabs that are grouped by yeah, two by full Bible, New Testament or portion by the scope of their all access school goals.

[53:21] Chris Klapp:
And then the fourth table is the red table, which is the all access school risk of completion.

[53:28] Peter Huang:
Risk of incompletion by 2033. Yep.

[53:35] Chris Klapp:
She has the same names, but yeah. Yeah, I think it's very helpful. And then the last tab are the graphs that you've been able to generate for that.

[53:49] Peter Huang:
It's just the graphical representation of those three tables. Technically, the red table graph is not on here. I just never generated it from there. That's fine. It would be easy enough if I needed to, but yeah, this is just because Dal wanted to know if a graphical representation of these tables was going to be helpful for his presentation. That's the only reason I put them in there. And then I don't think he even used them, so yeah, you didn't like the way they looked?

[54:21] Chris Klapp:
Figuring out which graph is actually really hard, right? Like, we're exploring a new view of the data that we actually haven't seen a table of, let alone a graphical representation. Right.

[54:33] Peter Huang:
You're looking at a pie chart and you're going like, why is, what does this even mean? Why the pie chart? Also, like, there's three different ones.

[54:40] Chris Klapp:
Well, I mean, Koush used a pie chart for the FBI and, yeah, we talked about it at length. We couldn't find a better table type, whatever that communicated well, but it was really confusing for us in the FBI and for this of the pies are different sizes and it's kind of hard to visualize. Ratio, it's good for ratios.

[55:03] Peter Huang:
I had to scale them like that as well because again, ratio wise, the sliver was so small. You couldn't read them, right? You couldn't read it or I couldn't fit a number in there, so I had to scale it up. Just so that the sliver would be big enough to be visible. Yeah. And then that throws it off in comparison with the other ones. And, yeah. Anyway, all the pie charts are, in my opinion, a not good way to, to kind of.

[55:30] Chris Klapp:
And I, I had the same problem even with the, I thought maybe a stacked bar chart would help, but then with the stacked bar chart, you have some of those slivers in the stacked chart that are so tiny. Yeah, they don't, they're not. Properly represented.

[55:45] Peter Huang:
Yeah. Yeah. I don't even know, like, how that's. That's one of the. The struggles, like, all that. I mean, progress Bible tries to give, like, graphs on their dashboard and stuff, and what you're trying to represent is just a lot of different things, so being not confusing. Is probably one of the harder parts of doing that, like representing things well and not being confusing. Yeah. That's definitely a challenge.

[56:22] Chris Klapp:
I'm hopeful that interviewing with the AI back and forth can help us come up with something. Yeah.

[56:32] Peter Huang:
Yeah, me too. I think that'd be great. I, and I, and I'm optimistic that it, that it definitely has the potential to help. Yeah, well, good.

[56:41] Chris Klapp:
Yeah. And like I told Dow, just to be clear, I have no idea where I'm going with this. I have no idea, like, I'm willing and excited to explore this, and I'm confident we, we can come up with something. I'm confident I can do something tangible and useful for us and and I said, I didn't tell you that to worry or, you know, because honestly, I didn't know what I was going to do for the last task he gave me. Yeah. You can see that, well, I feel like we have a good process now of how to deliver outcomes.

[57:18] Peter Huang:
Yeah, we'll figure this one out no matter what. I mean, so you don't have to worry about, but yeah, I agree. There's a good process here. You know what you're doing. You kind of have one project under your belt. That's in a similar vein, but maybe not quite as big.

[57:33] Chris Klapp:
That was like a practice or like a warm up because this is like a hundred times more complicated.

[57:41] Peter Huang:
But yeah, well, no matter what, we're gonna have to figure something out. And whether it's using the AI or not, we'll deliver something useful for the steering committee. Yeah.

[57:55] Chris Klapp:
All right. Well, I'm excited. I think each of the drivers are excited about it too. You know, Joel's pumped about it. So it's, I think everybody's committed to contribute to where we head with this project. So yeah.

[58:14] Peter Huang:
Yeah. Yeah, that's good. Yeah, it'll be a lot, but we'll, it's going to help us. We'll be we'll keep, you know, be getting more and more focused next year. And this is kind of the foundation of all of that.

[58:32] Chris Klapp:
Yeah.

[58:32] Peter Huang:
So I'm grateful to have you and yours, your, the application of your expertise as we try to put this together and analyze it and stuff. So thank you.

[58:45] Chris Klapp:
Well, I appreciate your time and help me understand how you got from the giant table down to your red table and the iterative process. Yeah, it's nice, clean, clear, concise. Yeah. Most likely based on this, I'll play with it next week and come back to you and then hopefully have something for us and have some sort of another round of recording of better understanding on how to refine it for the next round.

[59:26] Peter Huang:
Okay. Yeah, let me know. I'm happy to set up a recurring meeting or, you know, whatever you'd prefer.

[59:37] Chris Klapp:
So this would be a good protected time if it works for you.

[59:45] Peter Huang:
Yeah, if you want to do Friday mornings, then that works for me and it gives us time during the week to kind of get things done, process things as needed, et cetera, and then talk about it on Friday mornings.

[60:01] Chris Klapp:
Yeah, it's making me like, I wish, yeah. I feel like this is not going to be our last time of this type of project.

[60:14] Peter Huang:
Well, no, I mean, I don't even think that this project itself, it may never have like an actual end. Like it may have a logical end for us, but it's not going to be work that's going to just go away. Like somebody's going to have to do it. We're going to have to pass it off. In some way to somebody to keep doing and maintaining. And then there may be other things as time goes on. We may need to do a similar thing with the portions at some point, which is the largest number.

[60:48] Chris Klapp:
But I was also thinking even at an abstract level, we didn't know that the sustainability task was going to come through, right? And so those types of tasks To where you know, the lab spearheads them and then hands them off to like the text strategy working group or to another entity. Are we? Do you think we're going to have more like that in this and others or it's just unknown?

[61:21] Peter Huang:
Yeah, maybe it's unknown. What all of these represent are things that the steering committee wants to do. Or the acceleration subcommittee wants to do. And the only team that they trust to do them well is the lab because they're not going to give them to like the, you know, they're not going to give them to work groups. They've had bad experiences doing that. So I would imagine they'll have more things in the future that they want done that I will, that they will ask the, the lab to do because they need, they need somebody that they can trust. Getting it done.

[61:56] Chris Klapp:
So I guess with that, would it be worthwhile me looking into my budget of potentially finding someone else like Joshua for these types of off projects to work with or.

[62:11] Peter Huang:
I don't think so. Okay. To be honest, like, they are few and far between, and when they do come up, if they require, if they required funding or additional budget, it just, they, we can, we can tell them that. We can say, okay, if you want this done, it's going to cost money. We didn't budget for that. And then they have to, they'll find a way to provide additional funding for the things. That way we don't have to try to, like, budget ahead of time and. Like predict unknowable things. Like we might have a research project that comes up in 12 months. So we should probably put some money aside like that. That's not worth doing. Okay. If there's a funding need, if a project like or if in, if a commissioning or a request comes up and there's a budgetary need for it, then they will have to pay for it because if they want us to do it. I mean, it's like buying, it's paying for service. So I don't think it's on us to worry about that. Sounds good.

[63:23] Chris Klapp:
Well, thanks, Peter. Appreciate it.

[63:26] Peter Huang:
Yeah, thanks for the time, Clappy.

[63:29] Chris Klapp:
I'll look forward to seeing you next Friday and continuing where we left off and hopefully something for us to play with.

[63:36] Peter Huang:
Yeah, I'm actually just going to take this meeting and I'm going to repeat it weekly on Friday.

[63:41] Chris Klapp:
Yeah, sounds great for now. And if you want an extra 30 minutes, we could do that. We could do 9 30 to 10 30.

[63:54] Peter Huang:
Not 9 to 10 is fine. I just got this morning. I was just finishing breakfast and I got, I was late because I, I go and get Chick-fil-A on Friday mornings for Maddie. Because she doesn't work.

[64:07] Chris Klapp:
Well, if.

[64:08] Peter Huang:
And then I just.

[64:09] Chris Klapp:
Perfectly fine if you want to shift it a little bit.

[64:12] Peter Huang:
No, it's okay. I I usually like to wake up early anyway. I just got caught because the line was long at Chick-fil-A and I got home, and then I was trying to eat quickly before that. But that won't be a problem, hopefully in the future. Sounds good.

[64:28] Chris Klapp:
All right. Thanks, man. Yeah.

[64:30] Peter Huang:
All right.

[64:31] Chris Klapp:
See you later. Bye.

[64:33] Peter Huang:
Bye.

---

Chat with your meeting and watch the full recording: https://app.fyxer.com/call-recordings/2674f5e6-5337-4494-b3b9-2b7a7a32014e:9082952d-e087-429f-ba4a-13797f641c10
