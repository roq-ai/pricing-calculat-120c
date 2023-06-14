import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createPricingDetail } from 'apiSdk/pricing-details';
import { Error } from 'components/error';
import { pricingDetailValidationSchema } from 'validationSchema/pricing-details';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { OrganizationInterface } from 'interfaces/organization';
import { getOrganizations } from 'apiSdk/organizations';
import { PricingDetailInterface } from 'interfaces/pricing-detail';

function PricingDetailCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: PricingDetailInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createPricingDetail(values);
      resetForm();
      router.push('/pricing-details');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<PricingDetailInterface>({
    initialValues: {
      parameter: '',
      value: 0,
      organization_id: (router.query.organization_id as string) ?? null,
    },
    validationSchema: pricingDetailValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Pricing Detail
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="parameter" mb="4" isInvalid={!!formik.errors?.parameter}>
            <FormLabel>Parameter</FormLabel>
            <Input type="text" name="parameter" value={formik.values?.parameter} onChange={formik.handleChange} />
            {formik.errors.parameter && <FormErrorMessage>{formik.errors?.parameter}</FormErrorMessage>}
          </FormControl>
          <FormControl id="value" mb="4" isInvalid={!!formik.errors?.value}>
            <FormLabel>Value</FormLabel>
            <NumberInput
              name="value"
              value={formik.values?.value}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('value', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.value && <FormErrorMessage>{formik.errors?.value}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<OrganizationInterface>
            formik={formik}
            name={'organization_id'}
            label={'Select Organization'}
            placeholder={'Select Organization'}
            fetcher={getOrganizations}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'pricing_detail',
  operation: AccessOperationEnum.CREATE,
})(PricingDetailCreatePage);
