[![ko-fi](https://img.shields.io/badge/-buy%20me%20a%20coffee-%23FF5E5B?style=plastic)](https://ko-fi.com/slate) [![patreon](https://img.shields.io/badge/-support%20me%20on%20patreon-%235C5C5C?style=plastic)](https://patreon.com/slatesfoundrystuff) ![GitHub release (by tag)](https://img.shields.io/github/downloads/zarmstrong/fvtt-lightswitch/LightSwitch-1.1.0/total?style=plastic) ![GitHub all releases](https://img.shields.io/github/downloads/zarmstrong/fvtt-lightswitch/total?style=plastic) ![GitHub](https://img.shields.io/github/license/zarmstrong/fvtt-lightswitch?style=plastic)

# LightSwitch
This module allows players to trigger a macro that turns on and off lights (through the GM).

## How to use
###### **NOTE:**  A GM and player are required for this module to work.

 1. Open up any light configuration panel and set the name of the light. (Multiple lights can share a name and be triggered as a group.) When you're done, click Update Light Source.
![Screenshot 1](image/screen1.webp)
 2. Toggle the light(s) on or off in any combination by right clicking a light.
 3. Create a macro with the type *script*, with the following contents, replacing *lightgroup1* with the name of your light(s): `game.LightSwitch.flipTheSwitch("lightgroup1")` 
 4. Use whatever module you wish to trigger the macro. This macro MUST be triggered by a **user**, not a GM, otherwise it will not work. <sup><sub>(see below for a GM macro command)</sub></sup>  I recommend the module [Trigger Happy](https://foundryvtt.com/packages/trigger-happy/)
 5. Repeat the process for any other lights


If you wish to trigger macros as a GM, you can use the following macro command instead: `game.LightSwitch.flipTheSwitchGM("lightgroup1")`

When the macro is triggered, all lights matching the name you set in the macro will be toggled. If there are multiple lights, this could mean that some switch on, while others switch off.

### Attribution
#### Icons
* Some icons made by <a href="https://www.flaticon.com/authors/those-icons" title="Those Icons">Those Icons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>