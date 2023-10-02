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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useToast } from '@/components/ui/use-toast'
import { Theme, useTheme } from '@/context/theme-provider'
import { router, usePage } from '@inertiajs/react'
import { IconCheck, IconSelector } from '@tabler/icons-react'
import clsx from 'clsx'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type TFormValues = {
    theme: Theme
    language: 'en' | 'ru'
}

const LANGUAGES = [
    { value: 'ru', label: 'Русский' },
    { value: 'en', label: 'English' },
]

export default function Account() {
    const { t } = useTranslation()
    const { locale } = usePage().props
    const { theme, setTheme } = useTheme()
    const { toast } = useToast()

    const [isLangDropdownOpen, setLangDropdownOpen] = useState(false)

    const form = useForm<TFormValues>({
        defaultValues: {
            theme,
            language: locale,
        },
    })

    const onSubmit = (data: TFormValues) => {
        if (data.theme !== theme) {
            setTheme(data.theme)
        }

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
                    {/* THEME PREFERENCE */}
                    <FormField
                        control={form.control}
                        name="theme"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('Theme')}</FormLabel>

                                <FormDescription>
                                    {t('Select dashboard theme.')}
                                </FormDescription>

                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="pt-2 flex flex-col space-y-0"
                                    >
                                        <FormItem className="flex items-center space-x-2 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="light" />
                                            </FormControl>

                                            <FormLabel className="font-normal">
                                                {t('Light')}
                                            </FormLabel>
                                        </FormItem>

                                        <FormItem className="flex items-center space-x-2 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="dark" />
                                            </FormControl>

                                            <FormLabel className="font-normal">
                                                {t('Dark')}
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

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
