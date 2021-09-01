var debug=false;

class LightSwitch {
    static debug=false;

    static async init() {
        console.log("%c Light%cSwitch %c| initializing",'color: #7bf542','color: #d8eb34','color: #ffffff');
        LightSwitch.SOCKET = "module.LightSwitch";

        // init socket
        game.socket.on(LightSwitch.SOCKET, data => {
            if (debug) {
                console.log("%c Light%cSwitch %c| received socket data",'color: #7bf542','color: #d8eb34','color: #ffffff')
                console.log(data)
            }
            if (data.switchLight == true && game.user.isGM) {
                    LightSwitch.switchLight(data);
            }
        });
    }

    static switchLight(data)
    {
        console.log("%c Light%cSwitch %c| switching lights", "color: #7bf542", "color: #d8eb34", "color: #ffffff");
        var allLights = canvas.lighting.placeables.filter(i => i.data.flags.LightSwitch?.lightName === data.lightName)
        let updates = allLights.map(i => { return {_id: i.id, hidden: !i.data.hidden}})
        canvas.scene.updateEmbeddedDocuments("AmbientLight", updates)
        if (debug) {
            console.log("on")
            console.log(lightOnIDs)
            console.log("off")
            console.log(lightOffIDs)
        }
        console.log(`%c Light%cSwitch %c| switching lights off: ${lightOffIDs.join(', ')}`,'color: #7bf542','color: #d8eb34','color: #ffffff')
        canvas.lighting.updateAll({hidden: true}, (light => lightOffIDs.includes(light.id)))
        console.log(`%c Light%cSwitch %c| switching lights on: ${lightOnIDs.join(', ')}`,'color: #7bf542','color: #d8eb34','color: #ffffff')
        canvas.lighting.updateAll({hidden: false}, (light => lightOnIDs.includes(light.id)))
    }

    static async onRenderLightConfig(objectConfig, html, data) {
        var prefix = "lightSwitch";
        var lightNameTitle = game.i18n.localize("LIGHTSWITCH.LightName.title");
        var lightTypeSelector = html.find("[name='t']").parent(); // Get parent div
        var windowDiv = lightTypeSelector.parent().parent().parent();
        var newwheight=windowDiv.height()+30;
        windowDiv.height(newwheight);
        var currentValue;
        const lightObj = objectConfig.object;
        currentValue=lightObj.getFlag("LightSwitch", "lightName") || "light1"
        var customNameEl = $(
        `<div class="form-group">
            <label>${lightNameTitle}</label>
                <input type="text" name="lightSwitch.lightName" value="${currentValue}" data-dtype="String">
        </div>`);
        lightTypeSelector.before(customNameEl);
    }
    static onUpdateLight(scene, object, changes, diff){
       if(object.lightSwitch && changes.diff){ // Only attempt to save if lightSwitch prop has changed
            LightSwitch.saveCustomProperties(object);
        }
    }
    static async saveCustomProperties(object) {

        var customProperties = JSON.parse(JSON.stringify(object.lightSwitch)); // Clone changes
        var placeable = canvas.lighting.get(object._id);

        if(!customProperties || Object.getOwnPropertyNames(customProperties).length == 0){
            await placeable.unsetFlag("LightSwitch", "lightName"); // Remove flag if no custom vars
        } else {
            await placeable.setFlag("LightSwitch", "lightName", customProperties.lightName); // Set flag with custom vars
        }
    }
}

export async function flipTheSwitch(lightName) {
    if (debug)
        console.log("%c Light%cSwitch %c| Starting to send to socket",'color: #7bf542','color: #d8eb34','color: #ffffff')
    game.socket.emit(
        LightSwitch.SOCKET, {
            switchLight: true,
            lightName: lightName
        }); 
}

export async function flipTheSwitchGM(lightName) {
    var data = { lightName: lightName }
    if (debug)
        console.log("%c Light%cSwitch %c| flipping the switch",'color: #7bf542','color: #d8eb34','color: #ffffff')
    LightSwitch.switchLight(data)
}

Hooks.once('init', LightSwitch.init);
Hooks.on("renderLightConfig", LightSwitch.onRenderLightConfig);
Hooks.on("updateAmbientLight", LightSwitch.onUpdateLight);
Hooks.on('ready', () => {
    console.log("%c Light%cSwitch %c| Creating Macro Hooks",'color: #7bf542','color: #d8eb34','color: #ffffff')
    game['LightSwitch'] = {
        flipTheSwitch: flipTheSwitch,
        flipTheSwitchGM: flipTheSwitchGM
    };
});
