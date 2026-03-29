<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEndpointRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'url' => 'required|url',
            'method' => 'required|in:GET,POST,PUT,DELETE',
            'headers' => 'nullable|array',
            'body' => 'nullable|array',
            'expected_status' => 'required|integer',
            'interval' => 'required|integer|min:1',
        ];
    }
}
