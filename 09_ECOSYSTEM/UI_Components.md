# UI Components

> Shared UI components in dooz/ui.

---

## Overview

The `dooz/ui` package provides reusable Blade components for consistent UI across Dooz apps.

```bash
# Install
composer require dooz/ui
```

---

## Available Components

### Layout

| Component | Usage |
|-----------|-------|
| `<x-ui::app-layout>` | Main application wrapper |
| `<x-ui::sidebar>` | Navigation sidebar |
| `<x-ui::header>` | Page header with breadcrumbs |
| `<x-ui::card>` | Content card container |

### Forms

| Component | Usage |
|-----------|-------|
| `<x-ui::input>` | Text input field |
| `<x-ui::select>` | Dropdown select |
| `<x-ui::textarea>` | Multi-line text |
| `<x-ui::checkbox>` | Checkbox input |
| `<x-ui::radio>` | Radio button group |
| `<x-ui::button>` | Button element |

### Data Display

| Component | Usage |
|-----------|-------|
| `<x-ui::table>` | Data table |
| `<x-ui::badge>` | Status badge |
| `<x-ui::stat>` | Statistic card |
| `<x-ui::empty-state>` | No data placeholder |

### Feedback

| Component | Usage |
|-----------|-------|
| `<x-ui::alert>` | Alert message |
| `<x-ui::modal>` | Modal dialog |
| `<x-ui::toast>` | Toast notification |
| `<x-ui::loading>` | Loading spinner |

---

## Usage Examples

### Card with Form

```blade
<x-ui::card title="Create Device">
    <form method="POST" action="{{ route('devices.store') }}">
        @csrf
        
        <x-ui::input 
            name="device_code" 
            label="Device Code" 
            required 
        />
        
        <x-ui::select 
            name="category_id" 
            label="Category"
            :options="$categories"
        />
        
        <x-ui::button type="submit">
            Create Device
        </x-ui::button>
    </form>
</x-ui::card>
```

### Data Table

```blade
<x-ui::table>
    <x-slot:header>
        <th>Code</th>
        <th>Model</th>
        <th>Status</th>
        <th></th>
    </x-slot:header>
    
    @foreach($devices as $device)
        <tr>
            <td>{{ $device->device_code }}</td>
            <td>{{ $device->model }}</td>
            <td>
                <x-ui::badge :color="$device->status_color">
                    {{ $device->status }}
                </x-ui::badge>
            </td>
            <td>
                <x-ui::button size="sm" href="{{ route('devices.show', $device) }}">
                    View
                </x-ui::button>
            </td>
        </tr>
    @endforeach
</x-ui::table>
```

### Modal

```blade
<x-ui::modal id="confirm-delete" title="Confirm Delete">
    <p>Are you sure you want to delete this device?</p>
    
    <x-slot:footer>
        <x-ui::button color="secondary" x-on:click="$dispatch('close-modal')">
            Cancel
        </x-ui::button>
        <x-ui::button color="danger" wire:click="delete">
            Delete
        </x-ui::button>
    </x-slot:footer>
</x-ui::modal>
```

---

## Component Props

### Button

| Prop | Values | Default |
|------|--------|---------|
| `type` | `button`, `submit`, `reset` | `button` |
| `color` | `primary`, `secondary`, `danger`, `success` | `primary` |
| `size` | `sm`, `md`, `lg` | `md` |
| `href` | URL string | — |
| `disabled` | boolean | `false` |

### Input

| Prop | Values | Default |
|------|--------|---------|
| `name` | string (required) | — |
| `label` | string | — |
| `type` | `text`, `email`, `password`, `number`, `date` | `text` |
| `placeholder` | string | — |
| `required` | boolean | `false` |
| `disabled` | boolean | `false` |

### Badge

| Prop | Values | Default |
|------|--------|---------|
| `color` | `gray`, `green`, `yellow`, `red`, `blue` | `gray` |
| `size` | `sm`, `md` | `md` |

---

## Styling

Components use Tailwind CSS. Override with:

```blade
<x-ui::button class="bg-purple-600 hover:bg-purple-700">
    Custom Color
</x-ui::button>
```

---

## Publishing Assets

```bash
php artisan vendor:publish --tag=dooz-ui-views
php artisan vendor:publish --tag=dooz-ui-config
```
