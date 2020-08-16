<?php

namespace App\Http\Controllers\Authentication;

use App\Traits\ThrottlesLogins;
use Illuminate\Auth\AuthManager;
use Illuminate\Contracts\Auth\StatefulGuard;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

final class Login
{
    use ThrottlesLogins;

    /**
     * The identifier property.
     */
    protected $identifier = 'email';

    /**
     * The target redirection.
     */
    protected $redirectTo = '/';

    /**
     * The guard used for authentication.
     */
    protected StatefulGuard $guard;

    /**
     * Handle a login request to the application.
     */
    public function __invoke(Request $request, AuthManager $authentication)
    {
        $this->guard = $authentication->guard();
        $this->validateLogin($request);

        // If the class is using the ThrottlesLogins trait, we can automatically throttle
        // the login attempts for this application. We'll key this by the username and
        // the IP address of the client making these requests into this application.
        if (method_exists($this, 'hasTooManyLoginAttempts') &&
            $this->hasTooManyLoginAttempts($request)) {
            $this->fireLockoutEvent($request);

            return $this->sendLockoutResponse($request);
        }

        if ($this->attemptLogin($request)) {
            return $this->sendLoginResponse($request);
        }

        // If the login attempt was unsuccessful we will increment the number of attempts
        // to login and redirect the user back to the login form. Of course, when this
        // user surpasses their maximum number of attempts they will get locked out.
        $this->incrementLoginAttempts($request);

        // Throws an exception when the login attempt failed.
        throw ValidationException::withMessages([
            $this->identifier => [
                trans('auth.failed'),
            ],
        ]);
    }

    /**
     * Validates the user login request.
     */
    protected function validateLogin(Request $request): void
    {
        $request->validate([
            $this->identifier => 'required|string',
            'password'        => 'required|string',
        ]);
    }

    /**
     * Attempt to log the user into the application.
     */
    protected function attemptLogin(Request $request): bool
    {
        return $this->guard->attempt(
            $request->only($this->identifier, 'password'),
            $request->filled('remember')
        );
    }

    /**
     * Send the response after the user was authenticated.
     */
    protected function sendLoginResponse(Request $request)
    {
        $request->session()->regenerate();
        $this->clearLoginAttempts($request);

        return $request->wantsJson()
            ? response()->noContent()
            : redirect()->intended($this->redirectTo);
    }
}
