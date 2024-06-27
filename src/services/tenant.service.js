const db = require('../../model/index')
const { Op } = require('sequelize');

const tenantService = {};


// tenantService.getAllTenants = async (filters) => {
//     try {
//       const whereClause = [];
  
//       if (filters.id) {
//         whereClause.push({ id: filters.id });
//       }
  
//       if (filters.name) {
//         whereClause.push({ name: { [Op.iLike]: `%${filters.name}%` } });
//       }
  
//       if (filters.email) {
//         whereClause.push({ email: { [Op.iLike]: `%${filters.email}%` } });
//       }
  
//       if (filters.search && filters.search.length > 0) {
//         const searchConditions = [];
//         if (!isNaN(filters.search)) {
//           searchConditions.push({ id: filters.search });
//         }
//         searchConditions.push(
//           { name: { [Op.iLike]: `%${filters.search}%` } },
//           { email: { [Op.iLike]: `%${filters.search}%` } }
//         );
  
//         whereClause.push({
//           [Op.or]: searchConditions,
//         });
//       }
  
//       const tenants = await db.tenant.findAll({
//         where: {
//           [Op.and]: whereClause,
//         },
//       });
  
//       return tenants;
//     } catch (error) {
//       throw new Error('Error fetching tenants: ' + error.message);
//     }
//   };
  


tenantService.getAllTenants = async (filters) => {
    try {
      const whereClause = [];
    
      if (filters.id) {
        whereClause.push({ id: filters.id });
      }
    
      if (filters.name) {
        whereClause.push({ name: { [Op.iLike]: `%${filters.name}%` } });
      }
    
      if (filters.email) {
        whereClause.push({ email: { [Op.iLike]: `%${filters.email}%` } });
      }
    
      if (filters.status) {
        whereClause.push({ status: filters.status });
      }
    
      if (filters.search && filters.search.length > 0) {
        const searchConditions = [];
        if (!isNaN(filters.search)) {
          searchConditions.push({ id: filters.search });
        }
        searchConditions.push(
          { name: { [Op.iLike]: `%${filters.search}%` } },
          { email: { [Op.iLike]: `%${filters.search}%` } }
        );
    
        whereClause.push({
          [Op.or]: searchConditions,
        });
      }
    
      const tenants = await db.tenant.findAll({
        where: {
          [Op.and]: whereClause,
        },
      });
    
      return tenants;
    } catch (error) {
      throw new Error('Error fetching tenants: ' + error.message);
    }
  };
  


  tenantService.getTenantById = async (id) => {
    try {
        const tenant = await db.tenant.findByPk(id);
        return tenant;
    } catch (error) {
        throw new Error('Error fetching tenant by ID: ' + error.message);
    }
};

tenantService.createTenant = async (tenantData) => {
    try {
      const newTenant = await db.tenant.create(tenantData);
      return newTenant;
    } catch (error) {
      throw new Error('create new tenant : ' + error.message);
    }
  };
  
  tenantService.updateTenant = async (tenantId, tenantData) => {
    try {
      const tenant = await db.tenant.findByPk(tenantId);
      if (tenant) {
        const updatedTenant = await tenant.update(tenantData);
        return updatedTenant;
      } else {
        return null;
      }
    } catch (error) {
      throw new Error('update tenant: ' + error.message);
    }
  };
  
  tenantService.deleteTenant = async (tenantId) => {
    try {
        const tenant = await db.tenant.findByPk(tenantId);
        if (tenant) {
            await tenant.destroy();
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw new Error('delete tenant: ' + error.message);
    }
};


module.exports = tenantService;
