<?php

namespace Tests\Traits;

use Illuminate\Support\Arr;
use Illuminate\Testing\TestResponse;
use PHPUnit\Framework\Assert;

trait TestsInertia
{
    protected function setUp(): void
    {
        parent::setUp();
        $this->registerInertiaMacro();
    }

    protected function registerInertiaMacro(): void
    {
        TestResponse::macro('properties', function ($key = null) {
            $props = json_decode(json_encode($this->original->getData()['page']['props']), JSON_OBJECT_AS_ARRAY);

            return $key ? Arr::get($props, $key) : $props;
        });

        TestResponse::macro('assertHasProperty', function ($key) {
            Assert::assertTrue(Arr::has($this->properties(), $key), "Property '$key' was not in the page.");

            return $this;
        });

        TestResponse::macro('assertPropertyEquals', function ($key, $value) {
            $this->assertHasProperty($key);

            if (is_callable($value)) {
                $value($this->properties($key));
            } else {
                Assert::assertEquals($this->properties($key), $value);
            }

            return $this;
        });

        TestResponse::macro('assertPropertyCount', function ($key, $count) {
            $this->assertHasProperty($key);
            Assert::assertCount($count, $actual = $this->properties($key), "The page has $actual properties, expected $count.");

            return $this;
        });
    }
}
