# FGC Scoreboard
FGC Scoreboard is an html and css scoreboard for fighting game tournament streams. It uses absolutely no images (except for tournament/company logos which I've included a generic PSD for) and absolutely no webm files for animations.

## How FGC Scoreboard Works
To get started with FGC Scoreboard just open your streaming platform of choice, add a **broswer source**, and then navigate to wherever you saved the **scoreboard.html** file.

The scoreboard is built to work with StreamControl (included in the repo). All of your data entry should happen through that app including:
```
* Player Names
* Team Names
* Round
* Score
* Game
```

To change any of the colors, the font, the opacity, etc. just open the scss file and tweak the variables at the top. There's no need to jump into the rest of the styling unless you want to change something more drastic.

Finally, when you select a game (and hit save) the layout will adjust so that the scores and logos don't cover important guages.
#### Supported Games
```
* BBCF
* BBTAG
* DBFZ
* GGXRD
* KOFXIV
* MVCI
* SFVCE
* TEKKEN7
* UMVC3
* UNICLR
* USF4
```

## Drop Me a Line
If you found this at all useful, or have some suggestions, please let me know! You can drop me a line on twitter ([@tarikfayad](https://twitter.com/tarikfayad)), find me on Twitch ([ImpurestClub](https://www.twitch.tv/impurestclub/)), or ping me on my Discord server ([Link](https://discord.gg/ykj8tsN)).

Also, feel free to check out a much bigger project I've been working on called **WASD**. It's a search enginge for teammates/sparring partners along with a pretty comprehensive tournament calendar. You can find it here: https://wasdgaming.gg

If you've really found this useful, feel free to <br>
<a href="https://www.buymeacoffee.com/tarik" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

## Thank Yous
Massive thank you to TheSassageKing for making the initial [4 hour YouTube tutorial this is based on](https://www.youtube.com/watch?v=qqyFknxaVWo). The general look of the board and a good chunk of the code's skeleton comes from following that video.

Also, thank you to [u/Brylark](https://www.reddit.com/r/VALORANT/comments/g0747t/valorant_font/) over on Reddit for making the VALORANT font that I've included in the repo and plan to use myself for the time being.

## Screenshots
<p align="center">
  <img src="screenshots/dbfz.png" alt="FGC Scoreboard on DBFZ." width="75%">
  <img src="screenshots/uniclr.png" alt="FGC Scoreboard on UNICLR." width="75%">
</p>

## Todo
- [X] Add lower thirds for commentators
- [X] Create GIFs to show case animations
- [X] Explore Smash/Challonge/Toornament integration

Pull requests are more than welcomed!

## License
Usage is provided under the [MIT License](http://http//opensource.org/licenses/mit-license.php). See LICENSE for the full details.
