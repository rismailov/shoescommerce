import { Button } from '@/components/ui/button'
import { Command, CommandGroup, CommandItem } from '@/components/ui/command'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { useToast } from '@/components/ui/use-toast'
import { router, usePage } from '@inertiajs/react'
import { IconCheck, IconSelector } from '@tabler/icons-react'
import clsx from 'clsx'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type TFormValues = {
    language: 'en' | 'ru'
}

const LANGUAGES = [
    { value: 'ru', label: 'Русский' },
    { value: 'en', label: 'English' },
]

export default function Account() {
    const { t } = useTranslation()
    const { locale } = usePage().props
    const { toast } = useToast()

    const [isLangDropdownOpen, setLangDropdownOpen] = useState(false)

    const form = useForm<TFormValues>({
        defaultValues: {
            language: locale,
        },
    })

    const onSubmit = (data: TFormValues) => {
        if (locale !== data.language) {
            router.get(
                route('change_locale', { locale: data.language }),
                {},
                {
                    preserveState: true,
                    preserveScroll: true,
                },
            )
        }

        toast({
            variant: 'success',
            description: t('Account preferences updated.'),
        })
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col"
            >
                <div className="flex flex-col space-y-8">
                    {/* LANG PREFERENCE */}
                    <FormField
                        control={form.control}
                        name="language"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>{t('Language')}</FormLabel>

                                <FormDescription>
                                    {t(
                                        'This is the language that will be used in the dashboard.',
                                    )}
                                </FormDescription>

                                <Popover
                                    open={isLangDropdownOpen}
                                    onOpenChange={setLangDropdownOpen}
                                >
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                className={clsx(
                                                    'w-[200px] justify-between font-normal',
                                                    !field.value &&
                                                        'text-muted-foreground',
                                                )}
                                            >
                                                {field.value
                                                    ? LANGUAGES.find(
                                                          (language) =>
                                                              language.value ===
                                                              field.value,
                                                      )?.label
                                                    : 'Select language'}

                                                <IconSelector className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>

                                    <PopoverContent className="w-[200px] p-0">
                                        <Command>
                                            <CommandGroup>
                                                {LANGUAGES.map((language) => (
                                                    <CommandItem
                                                        value={language.label}
                                                        key={language.value}
                                                        onSelect={() => {
                                                            form.setValue(
                                                                'language',
                                                                language.value as
                                                                    | 'ru'
                                                                    | 'en',
                                                            )

                                                            setLangDropdownOpen(
                                                                false,
                                                            )
                                                        }}
                                                    >
                                                        <IconCheck
                                                            className={clsx(
                                                                'mr-2 h-4 w-4',
                                                                language.value ===
                                                                    field.value
                                                                    ? 'opacity-100'
                                                                    : 'opacity-0',
                                                            )}
                                                        />
                                                        {language.label}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </Command>
                                    </PopoverContent>
                                </Popover>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button
                    type="submit"
                    variant="accent"
                    className="mt-6 self-start"
                >
                    {t('Save')}
                </Button>
            </form>
        </Form>
    )
}
