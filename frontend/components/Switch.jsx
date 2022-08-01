import { Switch } from '@headlessui/react';

export default function CustomSwitch({ setEnabled, setting, enabled, label }) {
  return (
    <div className='flex items-center'>
      <span className='sr-only'>{label}</span>
      <Switch
        checked={enabled}
        onChange={() => setEnabled(setting)}
        className={`${
          enabled ? 'bg-blue-600' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 items-center rounded-full`}
      >
        <span className='sr-only'>{label}</span>
        <span
          className={`${
            enabled ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white`}
        />
      </Switch>
    </div>
  );
}
