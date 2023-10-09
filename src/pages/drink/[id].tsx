import { Container, Heading, ScaleFade, Stack, Text, useToast } from '@chakra-ui/react';
import type { Drink } from '@prisma/client';
import moment from 'moment';
import 'moment/locale/sr';
import { type NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useRouter } from 'next/router';
import nextI18nConfig from '../../../next-i18next.config.mjs';
import AccessDenied from '../../components/AccessDenied';
import EditDrinkForm from '../../components/EditDrinkForm';
import { PageSpinner } from '../../components/LoaderSpinner';
import { useGetCategory } from '../../hooks/useGetCategory';
import { useIsAdmin } from '../../hooks/useIsAdmin';
import { api } from '../../utils/api';

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'], nextI18nConfig, ['en', 'sr'])),
    },
});

const EditDrinkPage: NextPage = () => {
    const { t } = useTranslation();
    const toast = useToast();

    const router = useRouter();
    const { id } = router.query as {
        id: string;
    };
    const { data, isLoading } = api.drinks.getDrinkById.useQuery(
        { id },
        {
            refetchOnWindowFocus: false,
        },
    );

    const utils = api.useContext();
    const updateSingleDrink = api.drinks.updateDrink.useMutation();
    const { category } = useGetCategory(data?.categoryId ?? 1);
    const addDescription = category?.addDescription ?? false;
    const addTypes = category?.addTypes ?? false;
    const { data: units } = api.volume.getVolumeOptions.useQuery();
    const isAdmin = useIsAdmin();
    const setMomentLocale = (locale: string) => moment.locale(locale);
    const currentLang: string = router.locale ?? 'en';
    setMomentLocale(currentLang);
    const updatedAt = moment(data?.updatedAt);
    const relativeLastUpdatedAt = moment(updatedAt).fromNow();

    const handleProductUpdate = async (data: Drink) => {
        await updateSingleDrink.mutateAsync(
            {
                id,
                data,
            },
            {
                onSuccess: () => {
                    void utils.drinks.getDrinkById.invalidate({ id });
                    void router.back();
                    toast({
                        title: `Product updated!`,
                        description: `${data.title ?? ''} was successfully updated!`,
                        status: 'success',
                        isClosable: true,
                        position: 'top',
                    });
                },
                onError: error => {
                    toast({
                        title: `An error occurred`,
                        description: `${error.message}`,
                        status: 'success',
                        isClosable: true,
                        position: 'top',
                    });
                },
            },
        );
    };

    if (isLoading) {
        return <PageSpinner />;
    }

    if (!isAdmin) {
        return <AccessDenied />;
    }

    if (data) {
        return (
            <>
                <Head>
                    <title>
                        {t('edit_drink')} | {data.title}
                    </title>
                </Head>
                <Container>
                    <Stack gap="3" mt="5" mb="20">
                        <Heading size="lg" textAlign="center">
                            {t('edit_drink')} | {data.title}
                        </Heading>
                        <Text textAlign="center" opacity={0.5}>
                            {t('elements.additional_field.last_edit')} {relativeLastUpdatedAt}
                        </Text>
                        <ScaleFade initialScale={0.9} in unmountOnExit>
                            <EditDrinkForm
                                drink={data}
                                onSubmit={handleProductUpdate}
                                addDescription={addDescription}
                                addTypes={addTypes}
                                units={units}
                            />
                        </ScaleFade>
                    </Stack>
                </Container>
            </>
        );
    }

    return <p>Loading...</p>;
};

export default EditDrinkPage;
