import { useScript } from './useScript';

/** Reads a live portrait/status pair from PlayCanvas (docs/API.md § useAvatarSync). */
export function useAvatarSync(options: { pcEntity?: string } = {}): {
  src: string | undefined;
  status: string | undefined;
} {
  const { value: src } = useScript({ entityId: options.pcEntity ?? '', stateKey: 'avatarSrc' });
  const { value: status } = useScript({
    entityId: options.pcEntity ?? '',
    stateKey: 'avatarStatus',
  });
  return { src: src as string | undefined, status: status as string | undefined };
}
