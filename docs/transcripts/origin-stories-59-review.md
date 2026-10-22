# Review: NFT Origin Stories #59 transcript

Transcript file: `src/data/transcripts/origin-stories-59.md` (draft page at `/interviews/origin-stories-59`, noindex until `ready: true`).

It was cleaned from YouTube's auto-captions, which had no punctuation or capitals. Punctuation was added, fillers, stutters and false starts were removed, and names were fixed. Nothing was reworded or added. It's about 16,300 words. The chapters are the official ones from the video's YouTube description.

## Start here: the decisions that matter

1. **Muted swear words, marked `[—]` (93).** YouTube's captions mute profanity. You can fill them in, leave them as a dash (that's what the Raoul Pal page does), or delete them.
2. **Unclear words or names, marked `[?]` (35, plus `[Parrot?]` in the intro).** The ones most worth a listen:
   - 0:00: the co-host's name in the intro ("I'm RD, I'm [Parrot?]")
   - 2:12: "Wade Wolf", "Thunder Paw Multimedia"
   - 8:09 / 10:18: Professor "Nas"
   - 56:45 / 1:01:39: "Fewo" (FEWOCIOUS?)
   - 1:04:59: "DEyes project, the Decentral Eyes Mashups"
   - 1:38:44 / 1:40:21: "Artifact", which seems to be the host's platform that adopted the Coldie method
   - 1:35:30: "1 ETH reserve" (the captions say "one eighth reserve")
3. **Speakers.** Only Roger (RD) and Coldie speak. One line is marked `[SPEAKER?]` at 1:34:25, and about 25 short turn boundaries are best guesses. They're listed below.
4. **Facts that differ from the site** (left as said; nothing on the site has been changed):
   - **Bucket T.** Here, Bucket T is the vintage car you light-painted with Roger May, and market.json agrees. But the alt text in `site.ts` and `works.ts` says *"by Coldie with Bucket T"*, as if Bucket T were a collaborator. The site text is probably what's wrong.
   - **The 2019 R.A.R.E. burn.** You say it was because commissions went from 8% to 40%. releases.ts says it happened "when ERC-721 had become the standard." Both reasons may be true.
   - **Vitalik variants.** You say "maybe seven Vitaliks"; the site says six variants.
   - **Genesis buy-back.** At 30:25 you say "I bought my own Genesis NFT back". It's not clear which work this is.
   - **Real name.** At 15:46 a friend's line includes your first name, "Ryan". It's kept as said; remove it if you'd rather not have it there.
5. **Summary and quotes.** The 2-sentence summary and 6 quotes in the frontmatter show at the top of the page. All 6 quotes were checked against the raw captions.

## Full notes from the cleanup (by section)

**Trailing fragment (for part 2):** Part 1 stops at "No one gave a [—] about it." [34:14]. The fragment left over is: "and it allowed me to just just create just create some things and…" Part 2 should begin with it.

**[?] flags**
- [0:00] "I'm [Parrot?]": the co-host's name in the intro is a guess from the captions ("parrot"). No second host speaks in this part, so the intro is labeled ROGER.
- [2:12] "Wade Wolf [?]": the friend who started the class. Spelling not confirmed.
- [2:12] "Thunder Paw [?] Multimedia": the class name. Spelling or format not confirmed (could be "Thunderpaw").
- [8:09] and [10:18] "Nas [?]": the professor's name as captioned ("nas"). Please confirm.
- [9:12] "my [?] portfolio case": Roger is speaking, so "my" may have been "your".
- [20:07] "swim [?], gone": captioned "swim gone". Probably a sound effect like "swoop".
- [24:57] "I said at first [?]": captioned "i said it first".
- [32:05] "I don't [?] smoke weed": captioned "we'd like i don't smoke weed and hang out". This was probably "I don't know, smoke weed", but I didn't add a word. Coldie should decide what he wants here.

**[—] muted words (34 total):** 3:16 (×2), 3:49 (×2), 4:22, 4:53, 5:57, 6:30, 7:03, 7:37, 8:09 (×2), 9:12 (×2), 10:18, 11:25 (×3), 11:58, 13:03 (×3), 14:10 (×2), 19:04, 20:38, 22:49, 23:20, 26:05, 28:16, 30:25, 32:05, 32:36, 33:42. Note that "fuckly" ("slow as fuckly", 20:07) and "shitty" (22:49) were not muted in the captions, so they stay as said. At 10:18, "no, [—] you" is ambiguous in context.

**[inaudible] / [SPEAKER?]:** none.

**Uncertain turn boundaries**
- [0:00] The show intro is labeled ROGER *(Promo)*. Both hosts may share it ("I'm RD, I'm [Parrot?]").
- [4:22]–[4:53] The quick back-and-forth about the game programs ("But you do." / "That'd be amazing, man.") is split by inference.
- [9:12] "Oh, I see it back there… you can honor some things right now" is given to Roger. It could be partly Coldie.
- [9:44] "Sure." is given to Roger.
- [29:53] Roger's question ends at "presence of mind". The caption runs straight into Coldie's "Yeah, it's funny…".

**Silent corrections worth confirming**
- Coldy/Colby → Coldie. "a lot of money" → Alotta Money. "pads intersect" → "paths intersect".
- "andy sandberg" → Andy Samberg ("I'm on a Boat").
- "ellie weekly" → LA Weekly. "shelly/shelley leopold" → Shelley Leopold (please confirm the spelling). "kitty bungalow" → Kitty Bungalow.
- "shepherd fairy" → Shepard Fairey. "dabs myla" → Dabs Myla. "banks he's" → Banksys. Macaulay Culkin.
- "decentralized move" → "Decentral Eyes move" [5:26].
- "modge podge" → Mod Podge.
- "matt gleeson" → Mat Gleason, the spelling used in llms.txt.ts. "coagula art journal" → Coagula Art Journal.
- "rare art labs" → R.A.R.E. Art Labs.
- "patreon" → "patron" [29:53]. Roger means the buyer, not the Patreon platform. "presence of mine" → "presence of mind".
- "phaser" → "phase where" [15:15]. "sick of [—]" → "sick as [—]" [14:10]. "make art too" → "make art to" [31:33].
- "Ryan's awesome at collaging" [15:46]: Shelley's line uses his real first name. It's kept as said.

**Facts to check against the site files (flagged only, nothing changed)**
- [28:16] Coldie says his burnt gel-transfer piece was juried into a national show by Mat Gleason. llms.txt.ts dates the Gleason-juried exhibition to 2018. That fits, but the transcript gives no date.
- [30:25] "I bought my own Genesis NFT back": it's unclear which work this is. It could be The Day We've All Been Waiting For, Proof of Work – Genesis, or The Lost Vitalik – Decentral Eyes Genesis. Proof of Work – Genesis sold at Bonhams per site.ts, so a buy-back of that one would need checking.
- [31:33] "when I went there in 2018": matches R.A.R.E. Art Labs from May 2018 in the site files.
- [32:36] Pyramid on Mars was shown here as a physical lenticular before NFTs. releases.ts also lists a Pyramid on Mars token on R.A.R.E. Art Labs (2018-07-17). There's no conflict, just context.
- [15:15] "I've been collecting for three years, like, NFTs" (said in 2022): this suggests he started collecting around 2019, while he has been minting since 2018. No conflict.

**Join / trailing fragment**
- [34:48] Leading fragment "every single one was an experiment" continues part 1's last line ("...it allowed me to just, just create some things and"). Speaker is Coldie.
- [1:09:18] Trailing fragment, not included: "he was the like most pro like most" (Coldie, describing the stereoscopic buddy from the Human Nature series). Part 3 should pick up from here.

**[—] muted profanity** (all Coldie unless noted)
- [35:19] "pack my car full of my [—]"
- [36:27] "I just [—] ran in there"
- [37:34] "I rage burned all my [—]"
- [39:11] "I [—] rage burned all my [—]" (2)
- [43:31] "I didn't care what the [—] it was"
- [47:57] "oh [—], maybe seven Vitaliks"
- [49:02] "I put some [—] out"
- [50:10] "No one was buying [—]"
- [51:16] "For San Francisco 2018, [—], that was so much fun"
- [54:00] "swish, whatever [—]"
- [55:07] "holy [—], I can make a landscape"
- [56:12] "It was Christmas [?] [—]"
- [57:18] "vibing on everybody else's [—]"
- [57:50] "a total [—] homage to Alotta"; "no one else could ever [—] with" (2)
- [58:53] "I need to tell you some [—]"
- [59:58] "I don't want [—] from you"; "You [—]. Everything you told me came true" (Coldie quoting Beeple) (2)
- [1:02:12] "the art is [—] fantastic"
- [1:06:03] "do all that [—]"
- [1:07:41] "No [—]"
- [1:07:41] "show all the [—] that I made"; "no one had [—] glasses" (2)
- Total: 24 (matches the 24 muted gaps in the captions).

**[?] / [inaudible]**
- [38:07] "protecting my collectors from the day, from that [?], always": garbled in captions. Probably "from day one".
- [41:20] "Meural [?]": captions say "mir... mural mural frames". Meural is the digital frame brand, so this is likely right. Confirm.
- [56:12] "It was Christmas [?] [—]": the caption reads "it was christmas [ __ ]". The meaning is unclear.
- [56:45], [1:01:39] "Fewo [?]" (4 instances): captions say "fio", "fuel", "fibo". This is my guess at FEWOCIOUS ("Fewo"). Confirm the artist.
- [58:53] "before he [inaudible] it": a verb is missing in the captions ("before he it"). Probably "dropped" or "did".
- [59:58] "It's not in the flesh [?]": this is what the captions say, but it reads oddly. It may have been "it's nice in the flesh" or similar.
- [1:02:12] "maybe if all aren't coming out with shitty [?]": garbled. The meaning is roughly "if all the art coming out were bad". "shitty" is not muted in the captions, so I kept it.
- [1:04:59] "my DEyes [?] project, the Decentral Eyes [?] Mashups": captions say "my di's project uh the decentralized uh mashups". The site lists "DecentralEyes Mashup" (ASYNC).
- [1:06:34] "And [?] double down on the shout-out": captions say "and don't double down the shout out".
- [1:07:41] "animation [?]": captions say "that's really why i got into anime". This is probably "animation" cut off.

**Uncertain turn boundaries**
- [37:34] "A bit of a leap" is assigned to Roger as an interjection. It could be Coldie.
- [40:15] "Trust your intuition" is given to Coldie, and "Absolutely. I wanted you to say it... I want to talk about that piece" to Roger. The split could be different (for example, Roger says "Trust your intuition").
- [43:31] "It's the archaeology we were talking about off camera" is kept with Coldie. It could be a Roger interjection.
- [45:13] The pause/bid exchange is split Roger/Coldie/Roger/Coldie. I dropped a leading "you're like" before "Do what you got to do, dude".
- [52:21] The "Good challenge, right? / Varied results / Varied, I can imagine, at best" back-and-forth is my best guess.
- [58:22] Roger's turn is taken to start at "So it's funny, the day that we're recording this". "Wow", "Yep" and "Yeah, absolutely. Yeah, the Beeple effect..." are given to Coldie.
- [1:01:39] "Yeah, what a wild ride, huh?" goes to Roger and "Crazy. Really, really nuts." to Coldie. Both could be Coldie.
- [1:06:34] "Yeah, and he's the 3D glasses guy" is kept with Coldie. It may be a Roger interjection.
- [1:07:08]–[1:08:46] The glasses exchange is split into short turns from context. "So you're one more onboarded stereoscopic viewer, right?" is given to Coldie.
- No co-host spoke in this part. Only ROGER and COLDIE are used.

**Silent name/term corrections worth confirming**
- "rare art labs" → R.A.R.E. Art Labs; "super rare" → SuperRare; "open sea"/"openc" → OpenSea; "coldy"/"goldie" → Coldie; "a lot of money"/"a lotta" → Alotta Money / Alotta; "people" (Christie's $69M auction, "Mike") → Beeple; "metallic"/"of italics"/"vitalic" → Vitalik; "addition" → edition; "board apes" → Bored Apes; "x-copy"/"next copy" → XCOPY; "nftnyc" → NFT.NYC; "gifts" → GIFs; "charettes" → charrettes; "seeing a head" → seeing ahead; "minty" → minting; "hold me to homie" → homie to homie.
- "artists unleashed" → "Artist Unleashed", following releases.ts ("Artist Unleashed" contract). Johnny Dollar is kept as heard.
- "richard wilkins" at Manifold → "Richard, Wilkins" (two people: Manifold co-founders Richard Chen and Wilkins Chung). Confirm.
- "alex from openc" → "Alex from OpenSea" (presumably Alex Atallah). The surname was not said.
- "8% ... 40 commissions": I added the second "%".

**Possible conflicts with site files (spoken words kept as said)**
- [37:02]–[38:07] Coldie says he burned the unsold R.A.R.E. tokens in response to the commission change (8% → 40%). releases.ts frames the October 30, 2019 burn as happening "when ERC-721 had become the standard for NFTs". These are different stated reasons. They may both be true; consider harmonizing.
- [38:38] He says the buyer's edition was "probably 25 or somewhere around there". releases.ts gives editions for Pyramid on Mars and Underground Energy without that detail in the grep. Lost Vitalik was an edition of 25 and Proof of Work an edition of 10.
- [41:20] "Coinbase picked two pieces from all of R.A.R.E. Art Labs" and "they picked The Day We've All Been Waiting For". The site says one of that work's two editions is held by Coinbase. This is consistent, but "two pieces" (two artworks overall versus two editions) is ambiguous.
- [47:57] "maybe seven Vitaliks". releases.ts calls Variant 03 "the third of six Vitalik Buterin variants".
- [42:59] Variant 3 on Artist Unleashed: "it's like three years old". The site gives the mint date as January 5, 2019, about 3 years before the March 2022 recording. This is consistent.
- [58:22] Recording date stated as March 11 (Beeple's Christie's anniversary). The video was published 2022-03-15. No conflict.

Speaker and turn boundaries (only ROGER and COLDIE are heard in this part; no co-host lines identified):
- [1:12:34] "Wait, was his name Roger?" is given to ROGER (the host reacting to the late friend sharing his name), followed by Coldie's "Yeah, yeah, yeah, exactly." It could also be Coldie checking himself. Please confirm.
- [1:15:51]/[1:16:23] "So, yeah. Bless Roger." is left with Coldie. The next line ("I didn't put that together... Shout out to Roger May") is given to ROGER.
- [1:16:23] Roger's line ends "...an art piece that you put quite a lot of effort into." The "Yeah" that comes after it opens Coldie's turn.
- [1:30:02]/[1:30:35] The boundary is uncertain. Coldie ends on "just don't start dialing it in." "Don't start calling it [?]. You're living it, man..." is given to ROGER.
- [1:30:35] "Okay, go, because that's what I love. Let's make this our lightning round..." is given to Coldie. "Let's make this our lightning round" could be Roger.
- [1:32:13] "It's exciting." could be a Roger interjection. It's left with Coldie.
- [1:33:19]/[1:33:53] "Now it's all worth it." could be Coldie still talking. It's given to ROGER, as the start of "Two more things."
- [1:34:25] **[SPEAKER?]:** "Oh, I was gonna be there." It's unclear who says this or what it means.
- [1:37:37] In the "how we met" exchange, the boundaries are inferred. ROGER asks whether to tell the story; COLDIE says "Go, if you have a couple more minutes"; ROGER says "I've got five more minutes... you have to tell it"; COLDIE: "Okay, I'll do it." The "five more minutes" line could be Coldie's instead.
- [1:43:06] "I appreciate you." goes to Roger and "And yeah, just trying to do my best." to Coldie. The split is uncertain.

[?] flags:
- [1:09:53] "Realist [?] 3D slide": probably the Stereo Realist camera/slide format.
- [1:13:07] "the Desolation [?]": probably Desolation Wilderness.
- [1:16:23] "Rogers run alike [?]": the caption reads "rogers rogers run alike". Possibly a play on the shared name ("Rogers unite"?).
- [1:17:28] "lead [?] this off": the caption reads "leave this off".
- [1:18:36] "burn my piece [?]": unclear phrase in the billboard aside.
- [1:22:23] "loiter [?]": the caption reads "load her".
- [1:25:08] "personify [?]": possibly "glorify".
- [1:30:35] "calling it [?]": possibly "calling it in" / "phoning it in".
- [1:31:40] "Kong [?] wallet": the caption reads "kong wallet". Probably the Kong / NFC chip wallet from MetaFactory.
- [1:33:19] "met the equilibrium [?]".
- [1:35:30] "1 ETH [?] reserve": the caption reads "one eighth reserve".
- [1:37:37] "from your first game [?]": probably "from your perspective" or similar.
- [1:38:44], [1:40:21] "Artifact [?]": the caption reads "artifact"/"artifacts". This seems to be the host's platform, which adopted the Coldie method. Please confirm the name.

[—] muted words (35 total, listed by paragraph timestamp): [1:10:24] x1; [1:11:29] x1; [1:13:07] x1; [1:13:40] x2; [1:14:44] x1; [1:15:18] x2; [1:21:19] x1; [1:21:52] x3; [1:22:56] x3; [1:24:02] x1; [1:24:35] x1; [1:25:08] x3; [1:27:17] x2; [1:29:29] x1; [1:30:02] x1; [1:30:35] x1; [1:32:13] x1; [1:33:19] x2; [1:37:37] x1; [1:39:49] x1; [1:40:21] x1; [1:40:55] x1; [1:42:33] x3.

[inaudible]: none.

Silent corrections worth confirming:
- Coldy/goldie/kohli/kodi/colding → Coldie (in "the Coldie method" throughout).
- "lada"/"alada" → Alotta [1:29:29]; "that's a lot of money" → "that's Alotta Money" [1:27:50].
- "nft boxes" → NFTBoxes; "pranksy" → Pranksy; "meta factory" → MetaFactory; "sarah zucker" → Sarah Zucker; "bucket tee" → Bucket T; "the one" → The One; "cat call"/"tiger trap"/"game don't wait" → Cat Call / Tiger Trap / Game Don't Wait (all three appear in superrare.json as Human Nature Series titles); "rafael" → Rafael (spelling not verified); "nick" → Nick.
- "addition" → edition [1:17:28], [1:18:00], [1:31:08]; "bidding wore" → bidding war; "face paul" → facepalm; "people like the wine" → people like to whine; "synchronicities a muck" → synchronicities amok; "pulled the range back" → pulled the reins back; "duck hunt" → Duck Hunt.
- Removed a "[Music]" caption tag at [1:10:56], and a dangling final "you" at [1:43:39].
- [1:40:55] Dropped the false start "honoring the led, you know," before "the legend".

Factual points vs site files:
- Bucket T: RULES.md and site.ts imageAlt ("3D Light Painting 03 (2018) by Coldie with Bucket T") treat Bucket T as a collaborator. Coldie here ("a series of Bucket T, like classic car, 3D light paintings") and market.json ("We painted this vintage Bucket T... in collaboration with legendary 3D artist Roger May") make Bucket T the car and Roger May the collaborator. The site.ts alt text may need fixing.
- Trust Your Intuition: an edition of 500 via Pranksy's NFTBoxes. This fits releases.ts (supply 500, 2021-02-19, OpenSea "Series 1 — Genesis Series"). It also fits the NFTBoxes text in market.json.
- Split-cut shirt: he says he pre-sold these "like two years ago" (around 2020) and the drop is "maybe April" with MetaFactory. releases.ts lists the R.A.R.E. Art Labs split-cut shirt combos as 2019-06, so it's consistent if approximate.
- 3D concert photography from 2009 fits llms.txt (Coachella's official 3D photographer, 2009 and 2010).
- The New Year's shooting is dated both "eight years ago" and "it's been nine years" [1:19:40], [1:25:08]. Kept as said.
- Roger May is described as "like 65 at this time" at the light-painting shoot. Not checked against the site.
