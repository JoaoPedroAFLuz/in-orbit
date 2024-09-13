import { Plus } from 'lucide-react';

import { Button } from '@ui/button';
import { DialogTrigger } from '@ui/dialog';

import illustration from '@assets/lets-start-in-orbit-illustration.svg';
import logo from '@assets/logo-in-orbit.svg';

export function EmptyGoals() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-8">
      <img src={logo} alt="logo in orbit" />

      <img src={illustration} alt="ilustração in orbit" />

      <div className="flex max-w-80 flex-col items-center gap-5">
        <p className="text-center text-zinc-300">
          Você ainda não cadastrou nenhuma meta, que tal cadastrar uma agora
          mesmo?
        </p>

        <DialogTrigger asChild>
          <Button>
            <Plus className="size-4" />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>
    </div>
  );
}
