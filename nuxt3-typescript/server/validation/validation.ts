import vine, { SimpleMessagesProvider, errors } from '@vinejs/vine';
import { createError } from 'h3';

vine.messagesProvider = new SimpleMessagesProvider({
  required: 'api.error.{{ field }}Required',
  email: 'api.error.emailNotValid',
  password: 'api.error.passwordNotValid',
});

vine.convertEmptyStringsToNull = true;

async function credentialValidation(email: string, password: string) {
  const schema = vine.object({
    email: vine.string().email(),
    password: vine.string(),
  });

  try {
    const validator = vine.compile(schema);
    await validator.validate({ email, password });
  }
  catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      throw createError({
        statusCode: 404,
        statusMessage: error.messages[0].message,
      });
    }
  }
}

export default credentialValidation;
