import * as yup from 'yup';

yup.addMethod(yup.object, 'uniqueProperty', function (propertyName, message) {
    return this.test('unique', message, function (value) {

        console.log('path', this.path);
        if (!value || !value[propertyName]) {
        console.log('no value');
        return true;
        }

        if (
        this.parent
            .filter(v => v !== value)
            .some(v => v[propertyName] === value[propertyName])
        ) {
        console.log('duplicate value');
            throw this.createError({
            path: `${this.path}.${propertyName}`,
            });
        }

        return true;
    });
});
  
  // Define the schema
export const createTrustSchema = yup.object().shape({
    trustName: yup.string().required('Dtrust name is required'),
    settlorAddress: yup.string().matches(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum address'),
    trustees: yup.array()
      .of(
        yup.object()
          .shape({
            address: yup.string()
              .matches(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum address')
          })
          .uniqueProperty('address', 'Trustee addresses must be unique'),
      ).min(1,'at least one dtrust is required'), // Apply unique validation
    beneficiaries: yup.array()
      .of(
        yup.object()
        .shape({
          address: yup.string().matches(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum address'),
        })
        .uniqueProperty('address', 'Beneficiary addresses must be unique'),
      ).min(1,'at least one trust is required')
});