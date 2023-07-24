// ==UserScript==
// @name         Invidious_SideSuggested
// @namespace    https://github.com/Clozent/
// @version      0.3
// @updateURL    https://raw.githubusercontent.com/Clozent/Invidious_SideSuggest/main/Invidious_SideSuggested.user.js
// @downloadURL  https://raw.githubusercontent.com/Clozent/Invidious_SideSuggest/main/Invidious_SideSuggested.user.js
// @description  Places the suggested videos to the side of the player in invidious instances.
// @author       Clozent
// @match        vid.puffyan.us/watch*
// @match        invidious.tiekoetter.com/watch*
// @match        invidious.flokinet.to/watch*
// @match        inv.bp.projectsegfau.lt/watch*
// @match        inv.pistasjis.net/watch*
// @match        invidious.projectsegfau.lt/watch*
// @match        invidious.lunar.icu/watch*
// @match        invidious.privacydev.net/watch*
// @match        inv.tux.pizza/watch*
// @match        yt.oelrichsgarcia.de/watch*
// @match        inv.zzls.xyz/watch*
// @match        invidious.protokolla.fi/watch*
// @match        invidious.io.lol/watch*
// @match        inv.in.projectsegfau.lt/watch*
// @match        iv.nboeck.de/watch*
// @match        invidious.slipfox.xyz/watch*
// @match        invidious.no-logs.com/watch*
// @match        iv.melmac.space/watch*
// @match        yewtu.be/watch*
// @match        inv.makerlab.tech/watch*
// @match        inv.citw.lgbt/watch*
// @match        onion.tube/watch*
// @match        invidious.0011.lt/watch*
// @match        iv.ggtyler.dev/watch*
// @match        vid.priv.au/watch*
// @match        yt.artemislena.eu/watch*
// @match        http://pjsfhqamc7k6htnumrvn4cwqqdoggeepj7u5viyimgnxg3gar72q.b32.i2p/watch*
// @match        http://pjsfi2szfkb4guqzmfmlyq4no46fayertjrwt4h2uughccrh2lvq.b32.i2p/watch*
// @match        kbjggqkzv65ivcqj6bumvp337z6264huv5kpkwuv6gu5yjiskvan7fad.onion/watch*
// @match        grwp24hodrefzvjjuccrkw3mjq4tzhaaq32amf33dzpmuxe7ilepcmad.onion/watch*
// @match        w6ijuptxiku4xpnnaetxvnkc5vqcdu7mgns2u77qefoixi63vbvnpnqd.onion/watch*
// @match        u2cvlit75owumwpy4dj2hsmvkq7nvrclkpht7xgyye2pyoxhpmclkrad.onion/watch*
// @match        euxxcnhsynwmfidvhjf6uzptsmh4dipkmgdmcmxxuo7tunp3ad2jrwyd.onion/watch*
// @match        ng27owmagn5amdm7l5s3rsqxwscl5ynppnis5dqcasogkyxcfqn7psid.onion/watch*
// @match        iv.odysfvr23q5wgt7i456o5t3trw2cw5dgn56vbjfbq2m7xsc5vqbqpcyd.onion/watch*
// @match        invidious.g4c3eya4clenolymqbpgwz3q3tawoxw56yhzk4vugqrl6dtu3ejvhjid.onion/watch*
// @match        http://inv.pjsfkvpxlinjamtawaksbnnaqs2fc2mtvmozrzckxh7f3kis6yea25ad.onion/watch*
// @match        http://invbp.pjsfkvpxlinjamtawaksbnnaqs2fc2mtvmozrzckxh7f3kis6yea25ad.onion/watch*
// @match        invidiousge2cq2qegp4vdzsfu6mvpqdf6dtcyzmqbv7yx2spvkkajad.onion/watch*
// @match        c7hqkpkpemu6e7emz5b4vyz7idjgdvgaaa3dyimmeojqbgpea3xqjoid.onion/watch*
// @match        osbivz6guyeahrwp2lnwyjk2xos342h4ocsxyqrlaopqjuhwn2djiiyd.onion/watch*
// @run-at       document-idle
// @icon         https://raw.githubusercontent.com/iv-org/invidious/master/assets/invidious-colored-vector.svg
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // The suggested videos bar, to be moved to the side of the video player.
    let suggestBar = document.getElementsByClassName("pure-u-1 pure-u-lg-1-5")[1];

    // The element containing the video player.
    let video = document.getElementById("player-container");

    // The element containing the message that appears above the video player in some instances.
    let customMessage = video;
    if (video.parentElement.children[1].className == "h-box") {
        customMessage = video.parentElement.children[1];
    }

    // A collection of all "h-box" elements, one of which containing the video's title.
    let hBoxes = document.getElementsByClassName("h-box");

    // The element containing the video's title.
    let title;
    for (let i = 0; i < hBoxes.length; i++) {
        if ((hBoxes[i].childElementCount == 1) && (hBoxes[i].firstChild.tagName = "h1")) {
            title = hBoxes[i];
        }
    }

    // A collection of all "pure-g" elements, one of which is the element containing almost
    // everything that's below the video player.
    let pureGs = document.getElementsByClassName("pure-g");

    // The element containing the suggested videos bar, the video details and description and
    // comments - almost everything that's supposed to be below the video player.
    let detailsView;
    for (let i = 0; i < pureGs.length; i++) {
        if ((pureGs[i].childElementCount == 3) && (pureGs[i].firstElementChild.className == "pure-u-1 pure-u-lg-1-5")) {
            detailsView = pureGs[i];
        }
    }

    // An element to contain everything but the suggested video bar.
    let container = document.createElement("div");
    container.id = "custom-container";

    // An element to contain "container" and the suggested video bar.
    let everythingContainer = document.createElement("div");
    everythingContainer.id = "everything-custom-container";
    everythingContainer.style.justifyContent = "center";

    // Place everythingContainer in the appropriate location in the page.
    video.before(everythingContainer);

    // Place elements in the containers.
    // The script waits for the "loadmetadata" event due to an issue causing
    // the element sizes to change after a few seconds of the site being loaded.
    player.on(["loadedmetadata"], function (e) {
        container.append(video, title, detailsView);
        container.after(suggestBar);

        everythingContainer.append(container, suggestBar);
        everythingContainer.style.display = "flex";
    });
})();
