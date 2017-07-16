# Countries & Languages: minimal size files

This directory contains simplified data for each list,
converting `Object` with fields to `Array` with fields in predefined order to decrease the file size (and traffic).

## Country names (English) by **ISO 3166-1 alpha-2** code ~4KB

Example: `{"UA":"Ukraine"}`

## Countries ~18KB

Example: `{"UA":["Ukraine","Україна","380","EU","Kyiv","UAH",["uk"]]}`
(`name`, `native`, `phone`, `continent`, `capital`, `currency`, `languages`).

## Language names (English) by **ISO 639-1 alpha-2** code ~2KB

Example: `{"uk":"Ukrainian"}`

## Languages ~4KB

Example: `{"uk":["Ukrainian","Українська",0]}`
(`name`, `native`, `rtl`).
