import { Plus, X } from 'lucide-react';

import illustration from '@assets/lets-start-in-orbit-illustration.svg';
import logo from '@assets/logo-in-orbit.svg';

import { Button } from '@ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@ui/dialog';
import { Input } from '@ui/input';
import { Label } from '@ui/label';
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from '@ui/radio-group';

export function App() {
  return (
    <Dialog>
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

      <DialogContent>
        <div className="flex h-full flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <DialogTitle>Criar meta</DialogTitle>

              <DialogClose>
                <X className="size-4" />
              </DialogClose>
            </div>

            <DialogDescription>
              Adicione atividades que te{' '}
              <span className="underline">fazem bem</span> e que você quer
              continuar praticando toda semana.
            </DialogDescription>
          </div>

          <form className="flex-1 flex flex-col justify-between">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="title">Qual a atividade?</Label>

                <Input
                  id="title"
                  autoFocus
                  placeholder="Praticar exercícios, estudar, etc..."
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="days">Quantas vezes na semana?</Label>

                <RadioGroup id="days">
                  <RadioGroupItem value="1">
                    <RadioGroupIndicator />

                    <span className="text-zinc-300 text-sm font-medium leading-none">
                      1x na semana
                    </span>

                    <span className="text-lg leading-none">🥱</span>
                  </RadioGroupItem>

                  <RadioGroupItem value="2">
                    <RadioGroupIndicator />

                    <span className="text-zinc-300 text-sm font-medium leading-none">
                      2x na semana
                    </span>

                    <span className="text-lg leading-none">🤨</span>
                  </RadioGroupItem>

                  <RadioGroupItem value="3">
                    <RadioGroupIndicator />

                    <span className="text-zinc-300 text-sm font-medium leading-none">
                      3x na semana
                    </span>

                    <span className="text-lg leading-none">🙂</span>
                  </RadioGroupItem>

                  <RadioGroupItem value="4">
                    <RadioGroupIndicator />

                    <span className="text-zinc-300 text-sm font-medium leading-none">
                      4x na semana
                    </span>

                    <span className="text-lg leading-none">😜</span>
                  </RadioGroupItem>

                  <RadioGroupItem value="5">
                    <RadioGroupIndicator />

                    <span className="text-zinc-300 text-sm font-medium leading-none">
                      5x na semana
                    </span>

                    <span className="text-lg leading-none">😎</span>
                  </RadioGroupItem>

                  <RadioGroupItem value="6">
                    <RadioGroupIndicator />

                    <span className="text-zinc-300 text-sm font-medium leading-none">
                      6x na semana
                    </span>

                    <span className="text-lg leading-none">🤯</span>
                  </RadioGroupItem>

                  <RadioGroupItem value="7">
                    <RadioGroupIndicator />

                    <span className="text-zinc-300 text-sm font-medium leading-none">
                      Todos dias da semana
                    </span>

                    <span className="text-lg leading-none">🔥</span>
                  </RadioGroupItem>
                </RadioGroup>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <DialogClose asChild>
                <Button type="button" variant="secondary" className="flex-1">
                  Fechar
                </Button>
              </DialogClose>

              <Button className="flex-1">Salvar</Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
