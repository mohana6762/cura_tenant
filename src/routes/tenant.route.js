const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/tenant.controller');

// Define the route for getting all tenants
router.get('/get', tenantController.getAllTenants);
router.post('/create', tenantController.createTenant);
router.get('/:id', tenantController.getTenantById);
router.put('/update/:id', tenantController.updateTenant);
router.delete('/delete/:id', tenantController.deleteTenant);


module.exports = router;
