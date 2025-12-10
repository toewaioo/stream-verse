<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\VipKey;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class VipKeyController extends Controller
{
    public function index(Request $request)
    {
        $query = VipKey::query();

        if ($request->search) {
            $query->where('key', 'like', '%' . $request->search . '%');
        }

        $vipKeys = $query->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/VipKeys', [
            'vipKeys' => $vipKeys,
            'filters' => $request->only(['search']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'key' => 'nullable|string|unique:vip_keys,key|max:255',
            'duration_days' => 'required|integer|min:1',
            'max_uses' => 'nullable|integer|min:1',
            'expires_at' => 'nullable|date|after:today',
            'is_active' => 'boolean',
        ]);

        if (empty($validated['key'])) {
            $validated['key'] = strtoupper(Str::random(16));
        }

        VipKey::create($validated);

        return redirect()->back()->with('success', 'VIP Key created successfully.');
    }

    public function update(Request $request, VipKey $vipKey)
    {
        $validated = $request->validate([
            'key' => 'required|string|max:255|unique:vip_keys,key,' . $vipKey->id,
            'duration_days' => 'required|integer|min:1',
            'max_uses' => 'nullable|integer|min:1',
            'expires_at' => 'nullable|date', // Allow past dates if they want to expire it immediately
            'is_active' => 'boolean',
        ]);

        $vipKey->update($validated);

        return redirect()->back()->with('success', 'VIP Key updated successfully.');
    }

    public function destroy(VipKey $vipKey)
    {
        $vipKey->delete();

        return redirect()->back()->with('success', 'VIP Key deleted successfully.');
    }
}
