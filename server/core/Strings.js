const SEND_EMAIL = 'SEND_EMAIL';
const TEMPLATE_OF_EMAIL_VERIFICATION = 'app/emailTemplates/accountActivation';
const ADD_USER_ERROR = 'Unable to add user.';
const ACCOUNT_ACTIVATION = 'Account Activation';
const ACCOUNT_ALREADY_ACTIVATED = 'app/accountActivated';
const ACCOUNT_ACTIVE = 'app/activateAccount';
const TEMPLATE_OF_FORGOT_PASSWORD = 'app/emailTemplates/forgotPassword';
const TEMPLATE_OF_UPLOAD_REPORT = 'app/emailTemplates/uploadReport';
const FORGOT_PASSWORD = 'Password reset link';
const ROLE_USER = 'user';
const ROLE_ADMIN = 'admin';
const ROLE_OWNER = 'owner';
const SHIFT = {
  DAY: 'day',
  MORNING: 'morning',
  NIGHT: 'night',
};
const STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  SERVED: 'served',
};

module.exports = {
  SHIFT,
  STATUS,
  FORGOT_PASSWORD,
  TEMPLATE_OF_FORGOT_PASSWORD,
  ACCOUNT_ACTIVE,
  ACCOUNT_ALREADY_ACTIVATED,
  SEND_EMAIL,
  TEMPLATE_OF_EMAIL_VERIFICATION,
  ACCOUNT_ACTIVATION,
  ADD_USER_ERROR,
  TEMPLATE_OF_UPLOAD_REPORT,
  ROLE_USER,
  ROLE_ADMIN,
  ROLE_OWNER,
};
