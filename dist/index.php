<?php

declare(strict_types=1);

namespace Annexare\Countries;

use JsonException;

use function array_map;
use function file_get_contents;
use function idn_to_utf8;
use function json_decode;
use function ord;
use function preg_match;
use function str_split;

use const JSON_THROW_ON_ERROR;

/**
 * Loads a JSON file relative to the current directory.
 * 
 * @param string $path
 *
 * @return array
 * @throws JsonException
 * @internal
 */
function load(string $path): array
{
    static $cache = [];

    if (isset($cache[$path])) {
        return $cache[$path];
    }

    return $cache[$path] = json_decode(
        file_get_contents(__DIR__ . '/' . $path),
        true,
        512,
        JSON_THROW_ON_ERROR
    );
}

/**
 * Continents, key-value object (key is alpha-2 code).
 *
 * @return array
 * @throws JsonException
 */
function continents(): array
{
    return load('continents.min.json');
}

/**
 * Countries, key-value object (key is alpha-2 code, uppercase).
 *
 * @return array
 * @throws JsonException
 */
function countries(): array
{
    return load('countries.min.json');
}

/**
 * Languages in use only, key-value object (key is alpha-2 code).
 *
 * @return array
 * @throws JsonException
 */
function languages(): array
{
    return load('languages.min.json');
}

/**
 * Languages, key-value object (key is alpha-2 code).
 * A complete list including not used by Countries list.
 *
 * @return array
 * @throws JsonException
 */
function languagesAll(): array
{
    return load('languages.all.min.json');
}

/**
 * Returns country flag Emoji string.
 *
 * @param string $countryCode
 *
 * @return string
 */
function getEmojiFlag(string $countryCode): string
{
    $unicodeBase = 127462 - ord('A');
    $regex='/^[A-Z]{2}$/';

    if (! preg_match($regex, $countryCode)) {
        return '';
    }

    return idn_to_utf8(array_map(
            fn(string $letter) => $unicodeBase + ord($letter),
            str_split( $countryCode)
        )
    );
}

/**
 * TODO: Finish implementation
 * 
 * @param string $emoji
 *
 * @return string
 * @internal
 */
function getUnicode(string $emoji): string
{
    return '';
}
