var xmpp = require('node-xmpp');
var ltx = require('ltx');

// XEP-0054: vcard-temp
// http://xmpp.org/extensions/xep-0054.html

exports.name = "mod_vcard";

function VCardMixin(client) {
    client.on('inStanza', function(stz) {
        var stanza = ltx.parse(stz.toString());
        if (stanza.is('iq') && (vCard = stanza.getChild('vCard', "vcard-temp"))) {
            stanza.attrs.type = "error";
            stanza.attrs.to = stanza.attrs.from;
            delete stanza.attrs.from;
            client.emit('outStanza', stanza);
        }
        return;
    });
}

exports.mod = VCardMixin;
exports.configure = function(c2s, s2s) {
}

