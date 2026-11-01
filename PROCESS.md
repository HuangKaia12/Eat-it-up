# Development Process

## Starting Idea

I initially wanted to make a small interaction for passing the time when bored. The idea was simple: choose a food and eat it in three clicks. I wanted the action to be easy to understand, with immediate visual feedback and very few controls.

The project began with plain HTML, CSS and JavaScript, without animation or sound. I later requested a shared bite sound and, following user feedback, a counter showing how many foods had been eaten.

## Visual and Interaction Changes

The first version had warm interface colours and Chinese text. I asked for an English-only interface with less text and a more minimal appearance. Everything except the food became black, white or grey. I also removed the subtitle “Three bites. All gone.” so that the page would feel less crowded.

The original bite marks were too small. I requested larger bites, roughly a third of the food each. I then changed their positions: the first bite comes from the upper right, and the second from the upper left, slightly lower. This produces an irregular remaining outline instead of a symmetrical shape. The third click removes the rest of the food.

All three food illustrations use one shared SVG mask. This keeps the bite positions consistent and avoids needing separate pictures for every eating stage.

## Sound Changes

I asked Codex to synthesise one bite sound for all foods. The first version did not sound enough like biting, so I requested a lower sound. The next version had a suitable pitch but felt too muffled. After another adjustment, it still reminded me of footsteps rather than a crunch.

I explained that I wanted more of a short cracking sound. Codex then removed the bass impact and used a brief snap followed by smaller, irregular fracture sounds. These revisions came from my own listening feedback, separately from the user trials below.

## User Trials and Response

The first user tried the project and felt that it lacked a sense of purpose. They requested a counter showing how many foods had been eaten, so the repeated action would have a clearer sense of progress.

I responded by asking Codex to add the Eaten counter. It increases only when the third bite completes a food. Reset and food selection keep the accumulated total, while refreshing clears it. This was a small change that directly addressed the request without adding levels, a timer or a complex scoring system.

After this change, I invited another person to try the revised version. She found it interesting to express waiting time humorously through the number of cookies eaten. Her response supported the playful waiting-counter direction. This was feedback from a second person, not a retest with the first user.

These accounts summarise the feedback I reported rather than reproduce exact quotations. They describe two informal trials and are not intended as a broad claim about all users.

## Developing the Waiting-Counter Idea

My initial intention was simply to offer something to do when bored. With the counter in place, I developed a more specific context: a small game to play while waiting, for example for another webpage to load or for food at a restaurant.

“I waited for five cookies” gives waiting a humorous, personal unit. The second user's response was encouraging because she found this way of expressing waiting interesting. The restaurant and webpage-loading situations remain proposed uses rather than recorded trial settings.

The counter measures completed actions, not minutes or seconds. Keeping that distinction preserves the playful idea without presenting it as an accurate clock.

## AI Tools and My Decisions

I used OpenAI Codex to generate and revise the code, draw the three SVG foods, synthesise the WAV sound, run code-level checks and help write documentation from our development record. I supplied the direction, reviewed the results, requested changes and relayed the user feedback. The implementation and assets were AI-generated rather than manually coded or drawn by me.

One suggestion I kept was the shared SVG mask. It offered a simple way to use the same bite pattern across all three foods. Suggestions and outputs I changed included the warm interface styling, extra subtitle, small bite marks and several sound versions. I judged these against the minimal appearance and eating sensation I wanted.

## Checks

Codex ran JavaScript syntax checks and seven groups of simulated interaction tests covering bite progression, reset, switching, loading and errors, stale image requests, invalid configuration, initial state and completed-food counting. Additional checks covered audio triggering, handling playback errors without interrupting the interaction and WAV file structure. These checks passed.

These technical checks used a simulated environment. The AI browser tool blocked local-file preview, so they should not be read as a full visual or cross-browser test. The user trials above provide separate feedback on the experience and its purpose.

## Reflection

The project developed from a simple way to pass time into a playful way to express waiting. The first user's request gave the repeated action a visible total, and the second user's response supported the humour of the idea.

The revisions show how small details shaped the experience: larger, asymmetric bites made the visual action more pronounced, while the sound needed several changes to move away from a muffled impact. AI supplied the implementation, but reviewing its outputs and giving specific feedback remained an important part of my role.

A useful next step would be to try the project during an actual wait and find out whether the counter remains engaging beyond a short demonstration.

## Credits and Development History

OpenAI Codex assisted with code, SVG artwork, procedural sound, checks and documentation. The supplied Eat It Up requirements document informed the initial scope. No third-party libraries, downloaded food images, sampled audio or external datasets were used. No additional borrowed course code has been identified in the development record.

The conversation records the sequence of decisions and revisions. Git commits were not created during the earlier iterations, so this account is retrospective rather than a contemporaneous Git history. The first repository commit will record the current project; subsequent real changes can then be recorded in separate commits.
