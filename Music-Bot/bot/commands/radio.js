module.exports = {
    name: "radio",
    cooldown: 3,
    description: 'play a random music',
    aliases: [],
    run: async function(client, message, args, user) {
        try {
            const distube = client.distube;
            const { MessageEmbed } = require('discord.js');
            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) {
                message.channel.send({
                    embed: {
                        title: `❌ | Error`,
                        description: `you have to be in a voice channel to use this command`,
                        color: 0xF70000
                    }
                });
                return
            }
            const permissions = voiceChannel.permissionsFor(message.client.user);
            if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
                message.channel.send({
                    embed: {
                        title: `❌ | Error`,
                        description: `the bot need's same permissions to play a music like \`CONNECT\`, \`SPEAK\``,
                        color: 0xF70000
                    }
                });
                return
            }
            if (!args.length) {
                message.channel.send({
                    embed: {
                        title: `❌ | Error`,
                        description: `Here Are Some Radio Link If You Want :-
                        1. https://streams.ilovemusic.de/iloveradio10.mp3
                        2. https://streams.ilovemusic.de/iloveradio10.mp3
                        3. https://streams.ilovemusic.de/iloveradio109.mp3
                        4. https://streams.ilovemusic.de/iloveradio25.mp3
                    `,
                        color: 0xF70000
                    }
                });
                return
            }
            distube.play(message, args.join(" "));
            distube.toggleAutoplay(message);
            message.channel.send(
                new MessageEmbed()
                .setAuthor(`📻 | Radio`, client.user.avatarURL({ dynamic: true }), `https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=6479507312`)
                .setColor('GREEN')
                .setDescription(`📻 | the bot will repeat this song until you stop it using the \`stop\` command`)
                .setFooter(client.user.username, client.user.avatarURL({ dynamic: true }))
            )
        } catch (err) {
            console.log(err)
        }
    }
};
