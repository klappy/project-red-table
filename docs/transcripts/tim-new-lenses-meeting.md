# Project Red Table Data Visualization Discussion

**Date/Time:** September 16, 2025, 09:55 AM EDT

## Overall Summary

Chris and Tim discussed enhancing Project Red Table's data visualization by integrating multiple "lenses" including tabular data, geolocation, Human Development Index (HDI), population size, and strategic language overlays. They plan to keep data sources separate but unified in the interface, starting with country-level mapping and filtering, then progressing to more detailed geographic and ethnographic data integration.

## Key Points

- Lens one is the existing tabular data; lens two adds geolocation to represent data points geographically with filtering capabilities
- Lens three and four will incorporate Human Development Index and population size to color-code and size data points on maps, aiding in identifying challenges and resource distribution
- Strategic language data will be a future lens requiring a separate planning session due to complexity and data volume
- Data integration will maintain separation of sources but unify views through filtering and mapping, initially at the country level with plans for region and urban-level detail later
- Implementation is expected to be feasible within a short timeframe due to clear requirements and available JavaScript libraries for mapping and filtering

## Action Items

- Implement initial geolocation mapping with filtering based on existing tabular data at the country level
- Integrate HDI and population data overlays for enhanced visualization
- Plan a separate session to address strategic language data integration

## Open Questions

- How to best handle zooming and detailed ethnographic data mapping in future phases
- What additional data sources might be needed beyond the current CSV and progress.bible datasets
- How to manage data accuracy given the fuzzy and approximate nature of country-level assignments

Transcript
RESEARCH PREVIEW

Klappy
00:01
Okay, so let's just...
Tim
00:03
Okay, for the sake of argument, let's say lens one is the data that we've got from Project Red Bull.
Tim
00:10
So lens one is here's the tabular view, lens one is the table.
Klappy
00:17
Lens one is
Tim
00:19
table, breadcrumbs,
Tim
00:22
radio, whatever. What if we have in the pop-up where you can filter it? That's great. Lens two, what I'm suggesting is the geolocation of the needs.
Tim
00:36
the geolocation of risk.
Tim
00:39
This is what we want to know. So the data that we have here, can we extend that data, connect it to geolocation data, just point data so we get an approximate location. Where are we in this?
Klappy
00:49
So everything that we have,
Klappy
00:52
securing everything that we have in those tables,
Klappy
00:55
we could represent them geographically.
Tim
00:58
Right.
Klappy
00:58
So imagine you just switch modes from filter until table, you have the exact same filter, you can filter what's on the map.
Tim
01:01
This is where I'm going to go.
Klappy
01:02
You have the exact same filter, you can filter what's on the map.
Tim
01:07
Oh, three is
Klappy
01:08
beautiful.
Tim
01:08
going to be
Tim
01:11
Human Development Index, Lens
Tim
01:13
4 is
Klappy
01:15
yeah,
Tim
01:16
going to be population size.
Klappy
01:18
So where I'm going with this is if you were to enable HDI...
Tim
01:27
Now it is going to color code the countries because each of these is mapped to countries. Now you're going to be able to see point data overlaid on a color spectrum that's going to indicate, okay, this is going to be a challenge because we have a low HDI and a full Bible, something like that.
Klappy
01:40
So Andy has been doing a little bit more research in that area, and he feels that more relevant in the HDI. In the HDI data, he has found there's another metric inside that goes into the HDI that actually is more corollary to our needs, so I told him I put those.
Tim
02:01
That's fine. And then at some point getting population size so that we can actually see approximate numbers of species, to be able to change the shape. Now we've got a framework where we can start turning this into actionable. At some point I would like to have another overlay of strategic planning.
Tim
02:22
So that'll be lens five because strategic language is
Klappy
02:27
That one, I think, may be the...
Klappy
02:30
need a whole new planning session for that one because there's so much data available.
Tim
02:35
Yeah, and this is where we need the data that we have up on the
Tim
02:41
languages initiative.
Klappy
02:44
Here's my first high-level thought on it.
Klappy
02:49
HCI and a few other indexes like that.
Klappy
02:53
can be slipstreamed into the existing table. We have two data sources, we have one a CSV from
Tim
03:00
Well, this joins off of the country.
Klappy
03:04
Correct. And what
Tim
03:05
And technically,
Klappy
03:06
we have what
Tim
03:06
yes.
Klappy
03:07
we have is a temporary
Klappy
03:09
progress.bible in its data set already attributes it to a single one.
Klappy
03:16
That's a very fuzzy data timeline. That's country, they picked a country for
Tim
03:21
Yeah, which is already a very rough approximation,
Tim
03:30
do it phase one countries. I was thinking the same thing.
Klappy
03:33
So that's where I think we start with the geolocation. We can go into
Klappy
03:34
the law again.
Tim
03:35
you have here and some even if you had some like a fancy display of
Klappy
03:40
We could actually have region mapping for the long term, like actually highlight the countries.
Tim
03:44
where you could say there's three here or something like that and you hover over that it's going to pop up. These are the three, just like you do with, then you could pull in more data as well, population size.
Klappy
03:56
when you look at like photos on
Tim
04:01
It'll say there's a thousand photos.
Klappy
04:07
in Florida. You
Tim
04:08
Right.
Klappy
04:08
zoom in and then you start seeing where the different places you've been and taking photos.
Tim
04:11
you start having hotspots of different numbers.
Klappy
04:13
Okay.
Tim
04:13
So it'll combine them at a zoom out level. And at this point for phase one, you could just keep it combined, not even have a zoom on and just have by country, then be able to see how many are there.
Tim
04:27
hover over and you pop up a simplified table, something like that. Then you can put in HDI behind that. Now you're going to color code the country according to HDI. That would maybe be enough. A geolocation would be helpful because at some point we want to get to urban.
Tim
04:42
what's the closest place that we could maybe get connected to some of these.
Klappy
04:47
So...
Klappy
04:49
representing these separate data sources,
Klappy
04:54
Uniting them together.
Klappy
04:56
I am going to try to keep
Klappy
05:00
the AI focused on keeping data sources separate. And then in memories,
Klappy
05:07
unifying them so they stay decoupled and I wanted this to break before we build the database.
Tim
05:17
Yeah, I don't think we need the database maybe at any time.
Tim
05:23
because at some point basically right now it's all just bringing in data from other tables and if you need to put to a location to pull a different glottalog and stack it down, append as in feel. Strategic languages would just be a stack ranked
Tim
05:42
from highest resource level down to lowest, four, three, two, one of which we
Klappy
05:48
so you're just thinking that simple.
Tim
05:48
for now if we get
Klappy
05:49
we have a simplistic
Tim
05:50
more beyond that because then what I would like to see is
Tim
05:55
a filter where you could choose by which languages are dependent on French, for example, which ones are dependent on Arabic.
Klappy
06:03
So these are basically swapping out for labels. Potentially like you want to see the HDI information on here or are you thinking about
Klappy
06:16
layered satellite view like you might get on the weather app.
Tim
06:19
Oh, I would like to see, like, HDI. If it's a low HDI in this threshold, this range, let's color code that in the actual geolocation, the state boundaries.
Klappy
06:28
So what we'll have is
Klappy
06:31
This first pass has been basically
Klappy
06:35
pretty website that's backed by data. You can click it and see the data that's filtered. Now phase two will be doing all the same things.
Klappy
06:44
and we have two things we're doing. We're moving into augmenting new data sources that can be correlated by language and the second thing we're doing is mapping the mobile.
Klappy
06:54
Yes, basically those are 10 things.
Tim
06:56
And our point of connection will be for now as a country. Right now the only thing we're bringing in, well, in the first couple passes is connected at the country level, so HDI.
Klappy
07:05
Yeah, we're cheating at the moment and assuming progress that I will singles.
Tim
07:11
We'll just represent what they represent right now ahead of time. Just note that.
Klappy
07:14
And we'll bring to light and just make sure everybody knows.
Klappy
07:19
These languages are spoken in more than this one country, but this is what we have at
Tim
07:24
if we extend this to put in actual point data and again that's just
Tim
07:30
pending that up here to our table of data. This is an approximate location for it. That should just be a very simple mapping leaflet or something.
Klappy
07:38
Yeah, I think it makes sense for us to implement all of these things first. Then that next dimension will be ethnomography to showcase all that.
Klappy
07:47
Because it multiplies the complexity of mapping and the data sources.
Tim
07:52
And then you do have to deal with things like zooming and getting all that.
Tim
07:58
But I know there's a bunch of JavaScript libraries out there that make that pretty easy.
Klappy
08:02
Yeah, and the cool thing is because we've described it well enough, I take a photo and upload that. I think we've described it well enough to where I believe we could get this done in another day.
Tim
08:13
Let's see if I can weight it down.
Tim
08:16
Ha ha ha ha ha ha!
Klappy
08:18
Oh, man.
Tim
08:28
All right.
