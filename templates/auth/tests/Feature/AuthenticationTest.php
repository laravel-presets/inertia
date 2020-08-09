<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;
    use TestsInertia;

    /** @test */
    public function a_user_can_login()
    {
        $user = factory(User::class)->create([
            'password' => bcrypt('test-password'),
        ]);

        $this
            ->followingRedirects()
            ->post(route('login.attempt'), [
                'email'    => $user->email,
                'password' => 'test-password',
            ])
            ->assertOk();

        $this->assertAuthenticatedAs($user);
    }

    /** @test **/
    public function a_user_is_redirected_to_home_if_already_logged_in()
    {
        $user = factory(User::class)->create();
        $this->be($user);

        $this->get(route('login'))
            ->assertRedirect('/');
    }

    /** @test **/
    public function an_email_and_a_password_are_required()
    {
        $this
            ->followingRedirects()
            ->post(route('login.attempt'), [
                'email'    => '',
                'password' => '',
                ])
            ->assertPropertyEquals('errors', [
                'email'    => [__('validation.required', ['attribute' => 'email'])],
                'password' => [__('validation.required', ['attribute' => 'password'])],
            ]);

        $this->assertFalse(Auth::check());
    }
}
