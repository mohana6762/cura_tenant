const tenantService = require('../services/tenant.service');

const tenantController = {};

// tenantController.getAllTenants = async (req, res) => {
//     try {
//       const { id, name, email, search } = req.query;
//       const tenants = await tenantService.getAllTenants({ id, name, email, search});
//       res.status(200).json(tenants);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };

tenantController.getAllTenants = async (req, res) => {
    try {
      const { id, name, email, search, status } = req.query;
      const tenants = await tenantService.getAllTenants({ id, name, email, search, status });
      res.status(200).json(tenants);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

tenantController.getTenantById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Tenant ID is required' });
        }
        const tenant = await tenantService.getTenantById(id);
        if (!tenant) {
            return res.status(404).json({ message: 'Tenant not found' });
        }
        res.status(200).json(tenant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

tenantController.createTenant = async (req, res) => {
    try {
      const tenantData = req.body;
      const newTenant = await tenantService.createTenant(tenantData);
      res.status(201).json({
        message: "Tenant created successfully",
        data: newTenant
      });
    } catch (error) {
       
      res.status(500).json({ message: error.message });
    }
  };


  tenantController.updateTenant = async (req, res) => {
    try {
      const tenantId = req.params.id;
      const tenantData = req.body;
      const updatedTenant = await tenantService.updateTenant(tenantId, tenantData);
      if (updatedTenant) {
        res.status(200).json({
          message: "Tenant updated successfully",
          data: updatedTenant
        });
      } else {
        res.status(404).json({
          message: "Tenant not found"
        });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  tenantController.deleteTenant = async (req, res) => {
    try {
        const tenantId = req.params.id;
        const deletedTenant = await tenantService.deleteTenant(tenantId);
        if (deletedTenant) {
            res.status(200).json({
                message: "Tenant deleted successfully"
            });
        } else {
            res.status(404).json({
                message: "Tenant not found"
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = tenantController;
