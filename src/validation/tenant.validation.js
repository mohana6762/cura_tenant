const Joi = require('joi');
const create= Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNo: Joi.number().integer().required(),
  website: Joi.string().uri().optional(),
  buildingName: Joi.string().optional(),
  address: Joi.string().required(),
  unit: Joi.number().integer().optional(),
  postalCode: Joi.string().required(),
  country: Joi.string().required(),
  state: Joi.string().required(),
  licenseId: Joi.number().integer().optional(),
  status: Joi.string().valid('Active', 'Suspended', 'Pending Termination', 'Terminated').required(),
  isTrash: Joi.boolean().required()
});

const getTenantById = {
    params: Joi.object().keys({
      id: Joi.number().integer().required(),
    }),
  };


  const update = {
    params: Joi.object({
      id: Joi.string().required(),
    }),
    body: Joi.object().keys({
        name: Joi.string().optional(),
        email: Joi.string().email().optional(),
        phoneNo: Joi.number().integer().optional(),
        website: Joi.string().uri().optional(),
        buildingName: Joi.string().optional(),
        address: Joi.string().optional(),
        unit: Joi.number().integer().optional(),
        postalCode: Joi.string().optional(),
        country: Joi.string().optional(),
        state: Joi.string().optional(),
        licenseId: Joi.number().integer().optional(),
        status: Joi.string().valid('Active', 'Suspended', 'Pending Termination', 'Terminated').optional(),
        isTrash: Joi.boolean().optional()
    }),
  };

  const Tenantdelete = {
    body: Joi.object().keys({
      data: Joi.array().items(Joi.object().required()).required(),
    }),
  };

module.exports = {
    create,
    getTenantById,
    update,
    Tenantdelete
    
  };
  