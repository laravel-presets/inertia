<?php

namespace App\Http\Controllers\Authentication;

use Illuminate\Auth\AuthManager;
use Illuminate\Http\Request;

final class Logout
{
    protected string $redirectTo = '/';

    /**
     * Log the user out of the application.
     */
    public function __invoke(Request $request, AuthManager $authentication)
    {
        $authentication->guard()->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return $request->wantsJson()
            ? response()->noContent()
            : redirect($this->redirectTo);
    }
}
