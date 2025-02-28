import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormContext } from 'react-hook-form';
import { ProfileFormData } from '@/lib/zod-schema';

export function Location() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProfileFormData>();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="grid gap-2">
        <Label htmlFor="country">Country</Label>
        <Input
          id="country"
          placeholder="Enter your country"
          {...register('country')}
        />
        {errors.country && (
          <p className="text-sm text-red-500">{errors.country.message}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="state">State/Province</Label>
        <Input
          id="state"
          placeholder="Enter your state/province"
          {...register('state')}
        />
        {errors.state && (
          <p className="text-sm text-red-500">{errors.state.message}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="city">City</Label>
        <Input
          id="city"
          placeholder="Enter your city"
          {...register('city')}
        />
        {errors.city && (
          <p className="text-sm text-red-500">{errors.city.message}</p>
        )}
      </div>
    </div>
  );
}

export default Location;
