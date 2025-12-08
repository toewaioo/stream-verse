<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\VipKey;
use App\Models\VipSubscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;

class VipSubscriptionController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $subscription = VipSubscription::where('user_id', $user->id)
            ->active()
            ->orderBy('end_date', 'desc')
            ->first();

        return Inertia::render('User/Subscription', [
            'subscription' => $subscription
        ]);
    }

    public function redeem(Request $request)
    {
        $request->validate([
            'key' => 'required|string|exists:vip_keys,key',
        ]);

        $vipKey = VipKey::where('key', $request->key)->first();

        if (!$vipKey->is_active) {
            return back()->withErrors(['key' => 'This key has already been used or is inactive.']);
        }

        $user = Auth::user();

        // Check for existing active subscription to extend
        $existingSub = VipSubscription::where('user_id', $user->id)
            ->active()
            ->orderBy('end_date', 'desc')
            ->first();

        $startDate = now();
        if ($existingSub) {
            $startDate = $existingSub->end_date;
        }

        $endDate = $startDate->copy()->addDays($vipKey->duration_days);

        // Create subscription
        VipSubscription::create([
            'user_id' => $user->id,
            'key_id' => $vipKey->id,
            'start_date' => $startDate,
            'end_date' => $endDate,
        ]);

        // Deactivate key
        $vipKey->update(['is_active' => false]);

        return back()->with('success', 'VIP Subscription activated successfully!');
    }
}
