<?php

use PHPUnit\Framework\ExpectationFailedException;
use PHPUnit\Framework\TestCase;

use function Annexare\Countries\continents;
use function Annexare\Countries\countries;
use function Annexare\Countries\languages;
use function Annexare\Countries\languagesAll;

class CountriesTest extends TestCase
{
  /**
   * @throws JsonException
   * @throws ExpectationFailedException
   * @throws \SebastianBergmann\RecursionContext\InvalidArgumentException
   */
  public function testCountries(): void
  {
    $countries = countries();

    self::assertIsArray($countries);
    self::assertJsonStringEqualsJsonFile(
      __DIR__ . '/../../dist/countries.min.json',
      json_encode($countries, JSON_THROW_ON_ERROR)
    );
  }

  /**
   * @throws JsonException
   * @throws ExpectationFailedException
   * @throws \SebastianBergmann\RecursionContext\InvalidArgumentException
   */
  public function testContinents(): void
  {
    $continents = continents();

    self::assertIsArray($continents);
    self::assertJsonStringEqualsJsonFile(
      __DIR__ . '/../../dist/continents.min.json',
      json_encode($continents, JSON_THROW_ON_ERROR)
    );
  }

  /**
   * @throws JsonException
   * @throws ExpectationFailedException
   * @throws \SebastianBergmann\RecursionContext\InvalidArgumentException
   */
  public function testLanguages(): void
  {
    $languages = languages();

    self::assertIsArray($languages);
    self::assertJsonStringEqualsJsonFile(
      __DIR__ . '/../../dist/languages.min.json',
      json_encode($languages, JSON_THROW_ON_ERROR)
    );
  }

  /**
   * @throws JsonException
   * @throws ExpectationFailedException
   * @throws \SebastianBergmann\RecursionContext\InvalidArgumentException
   */
  public function testLanguagesAll(): void
  {
    $languagesAll = languagesAll();

    self::assertIsArray($languagesAll);
    self::assertJsonStringEqualsJsonFile(
      __DIR__ . '/../../dist/languages.all.min.json',
      json_encode($languagesAll, JSON_THROW_ON_ERROR)
    );
  }
}
