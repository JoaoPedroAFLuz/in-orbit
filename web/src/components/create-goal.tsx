import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { type CreateGoalForm, createGoalSchema } from '@dto/create-goal';
import { useCreateGoal } from '@hooks/use-create-goal-completion copy';
import { useGetPendingGoals } from '@hooks/use-get-pending-goals';
import { useGetSummary } from '@hooks/use-get-summary';

import { Loader } from './loader';
import { Button } from './ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from './ui/radio-group';

export function CreateGoal() {
  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<CreateGoalForm>({
    resolver: zodResolver(createGoalSchema),
  });

  const { createGoal, isPendingCreateGoal } = useCreateGoal();
  const { refetchSummary } = useGetSummary();
  const { refetchPendingGoals } = useGetPendingGoals();

  async function handleCreateGoal(data: CreateGoalForm) {
    await createGoal(data);

    await Promise.all([refetchSummary(), refetchPendingGoals()]);

    toast.success('Meta criada com sucesso!');
  }

  return (
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

        <form
          onSubmit={handleSubmit(handleCreateGoal)}
          className="flex-1 flex flex-col justify-between"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Qual a atividade?</Label>

              <Input
                id="title"
                autoFocus
                placeholder="Praticar exercícios, estudar, etc..."
                {...register('title')}
              />

              {errors.title && (
                <span className="text-red-500 text-sm">
                  {errors.title.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="days">Quantas vezes na semana?</Label>

              <Controller
                control={control}
                name="desiredWeeklyFrequency"
                defaultValue={4}
                render={({ field }) => (
                  <RadioGroup
                    value={String(field.value)}
                    onValueChange={field.onChange}
                  >
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
                )}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DialogClose asChild>
              <Button type="button" variant="secondary" className="flex-1">
                Fechar
              </Button>
            </DialogClose>

            <Button
              variant={!isPendingCreateGoal ? 'primary' : 'secondary'}
              disabled={isPendingCreateGoal}
              className="flex-1"
            >
              {isPendingCreateGoal ? <Loader /> : 'Salvar'}
            </Button>
          </div>
        </form>
      </div>
    </DialogContent>
  );
}
