const { commands, settings } = require("../config");
const Discord = require('discord.js');
const db = require('quick.db')
const util = require('minecraft-server-util')
const warn = require('chalk').keyword('yellow').bold

module.exports.config = {
    name: "version", //Name of command - RENAME THE FILE TOO!!!
    description: "Version command", //Description of command - you can change it :)
    aliases: commands.version, //Command's aliases - set them in config.js
    enable: true //Enable this command? - true or false (boolean)
};

module.exports.run = async (bot, message, args) => {
    const { server, config, text } = bot;
    const warns = config.settings.warns;
    const settings = config.settings
;
    if(!server.work) return;

    let icon = server.icon ? server.icon : message.guild.icon;
    
    if(server.type === 'java') {
        try {
            const result = await util.status(server.ip, server.port)
            var versionOriginal = result.version.name
        } catch(e) {
            if (warns) console.log(warn(`Couldn't get version from server! Getting it from config..`))
            var versionOriginal = config.server.version;
        };   

        if(settings.split) {
            if(versionOriginal.includes("Spigot")) {
                var versionAdvanced = versionOriginal.replace("Spigot", "")
            } else if (versionOriginal.includes("Paper")) {
                var versionAdvanced = versionOriginal.replace("Paper", "")
            } else if (versionOriginal.includes("Tuinity")) {
                var versionAdvanced = versionOriginal.replace("Tuinity", "")
            }
        }
        const version = versionAdvanced ? versionAdvanced : versionOriginal
        
        if(text.version.title === "" || text.version.description === "") {
            const versionEmbed = new Discord.MessageEmbed()
                .setTitle((config.server.name ? config.server.name : message.guild.name) + ' Version:', icon)
                .setDescription(`**${version}**`)
                .setColor(config.embeds.color);
            message.channel.send({ embeds: [versionEmbed] });
        } else {
            text.version.title = text.version.title.replace('{serverIp}', server.ip)
            text.version.title = text.version.title.replace('{serverPort}', server.port)
            text.version.title = text.version.title.replace('{serverName}', config.server.name ? config.server.name : message.guild.name)
            text.version.title = text.version.title.replace('{voteLink}', config.server.vote)
            text.version.title = text.version.title.replace('{serverVersion}', version)
            text.version.title = text.version.title.replace('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1))

            text.version.description = text.version.description.replace('{serverIp}', server.ip)
            text.version.description = text.version.description.replace('{serverPort}', server.port)
            text.version.description = text.version.description.replace('{serverName}', config.server.name ? config.server.name : message.guild.name)
            text.version.description = text.version.description.replace('{voteLink}', config.server.vote)
            text.version.description = text.version.description.replace('{serverVersion}', version)
            text.version.description = text.version.description.replace('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1))

            const versionEmbed = new Discord.MessageEmbed()
                .setTitle(text.version.title, icon)
                .setDescription(text.version.description)
                .setColor(config.embeds.color);
            message.channel.send({ embeds: [versionEmbed] });
        }
    } else {
        try {
            const result = await util.statusBedrock(server.ip, server.port)
            var versionOriginal = result.version.name
        } catch(e) {
            if (warns) console.log(warn(`Couldn't get version from server! Getting it from config..`))
            var versionOriginal = config.server.version
        }
        if(settings.split) {
            if(versionOriginal.includes("Spigot")) {
                var versionAdvanced = versionOriginal.replace("Spigot", "")
            } else if (versionOriginal.includes("Paper")) {
                var versionAdvanced = versionOriginal.replace("Paper", "")
            } else if (versionOriginal.includes("Tuinity")) {
                var versionAdvanced = versionOriginal.replace("Tuinity", "")
            }
        }
        const version = versionAdvanced ? versionAdvanced : versionOriginal

        if(text.version.title === "" || text.version.description === "") {
            const versionEmbed = new Discord.MessageEmbed()
                .setTitle((config.server.name ? config.server.name : message.guild.name) + ' Version:', icon)
                .setDescription(`**${version}**`)
                .setColor(config.embeds.color);
            message.channel.send({ embeds: [versionEmbed] });
        } else {
            text.version.title = text.version.title.replace('{serverIp}', server.ip)
            text.version.title = text.version.title.replace('{serverPort}', server.port)
            text.version.title = text.version.title.replace('{serverName}', config.server.name ? config.server.name : message.guild.name)
            text.version.title = text.version.title.replace('{voteLink}', config.server.vote)
            text.version.title = text.version.title.replace('{serverVersion}', version)
            text.version.title = text.version.title.replace('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1))

            text.version.description = text.version.description.replace('{serverIp}', server.ip)
            text.version.description = text.version.description.replace('{serverPort}', server.port)
            text.version.description = text.version.description.replace('{serverName}', config.server.name ? config.server.name : message.guild.name)
            text.version.description = text.version.description.replace('{voteLink}', config.server.vote)
            text.version.description = text.version.description.replace('{serverVersion}', version)
            text.version.description = text.version.description.replace('{serverType}', config.server.type.charAt(0).toUpperCase() + config.server.type.slice(1))

            const versionEmbed = new Discord.MessageEmbed()
                .setTitle(text.version.title, icon)
                .setDescription(text.version.description)
                .setColor(config.embeds.color);
            message.channel.send({ embeds: [versionEmbed] });
        }
    }
};