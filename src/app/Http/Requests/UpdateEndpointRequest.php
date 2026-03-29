<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEndpointRequest extends FormRequest
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
            'name' => 'sometimes|required|string|max:255',
            'url' => 'sometimes|required|url',
            'method' => 'sometimes|required|in:GET,POST,PUT,DELETE',
            'headers' => 'nullable|array',
            'body' => 'nullable|array',
            'expected_status' => 'sometimes|required|integer',
            'interval' => 'sometimes|required|integer|min:1',
            'is_active' => 'sometimes|boolean',
        ];
    }
}
