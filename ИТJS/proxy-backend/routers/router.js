const Router = require("express").Router;
const ProductController = require('../controllers/product-controller');
const OrgatizationController = require('../controllers/organization-controller');
const IndividualController = require('../controllers/individual-controller');
const ProxyBodyController = require('../controllers/proxy-body-controller');
const ProxyHeaderController = require('../controllers/proxy-header-controller');
const ClasController = require('../controllers/clas-controller');
const MarkController = require('../controllers/mark-controller');
const DocBodyController = require('../controllers/doc-body-controller');
const DocHeaderController = require('../controllers/doc-header-controller');


const router = new Router();

router.get
    (
        '/products',
        ProductController.getAllRecords,
    );

router.post
    (
        '/products',
        ProductController.createRecord,
    );

router.put
    (
        '/products',
        ProductController.updateRecord,
    );

router.delete
    (
        '/products/:id',
        ProductController.removeRecord,
    );

router.get
    (
        '/organizations',
        OrgatizationController.getAllRecords,
    );

router.post
    (
        '/organizations',
        OrgatizationController.createRecord,
    );

router.put
    (
        '/organizations',
        OrgatizationController.updateRecord,
    );

router.delete
    (
        '/organizations/:id',
        OrgatizationController.removeRecord,
    );

router.get
    (
        '/individuals',
        IndividualController.getAllRecords,
    );

router.post
    (
        '/individuals',
        IndividualController.createRecord,
    );

router.put
    (
        '/individuals',
        IndividualController.updateRecord,
    );

router.delete
    (
        '/individuals/:id',
        IndividualController.removeRecord,
    );

router.get
    (
        '/proxy-bodies/:headerId',
        ProxyBodyController.getAllHeadersRecords,
    );

router.post
    (
        '/proxy-bodies',
        ProxyBodyController.createRecord,
    );

router.put
    (
        '/proxy-bodies',
        ProxyBodyController.updateRecord,
    );

router.delete
    (
        '/proxy-bodies/:id',
        ProxyBodyController.removeRecord,
    );

router.get
    (
        '/proxy-headers',
        ProxyHeaderController.getAllRecords,
    );

router.get
    (
        '/proxy-headers/:id',
        ProxyHeaderController.getOneRecord,
    );

router.post
    (
        '/proxy-headers',
        ProxyHeaderController.createRecord,
    );

router.put
    (
        '/proxy-headers',
        ProxyHeaderController.updateRecord,
    );

router.delete
    (
        '/proxy-headers/:id',
        ProxyHeaderController.removeRecord,
    );

    router.get
    (
        '/clas',
        ClasController.getAllRecords,
    );

router.post
    (
        '/clas',
        ClasController.createRecord,
    );

router.put
    (
        '/clas',
        ClasController.updateRecord,
    );

router.delete
    (
        '/clas/:id',
        ClasController.removeRecord,
    );

    router.get
    (
        '/marks',
        MarkController.getAllRecords,
    );

router.post
    (
        '/marks',
        MarkController.createRecord,
    );

router.put
    (
        '/marks',
        MarkController.updateRecord,
    );

router.delete
    (
        '/marks/:id',
        MarkController.removeRecord,
    );

    router.get
    (
        '/doc-bodies/:headerId',
        DocBodyController.getAllHeadersRecords,
    );

router.post
    (
        '/doc-bodies',
        DocBodyController.createRecord,
    );

router.put
    (
        '/doc-bodies',
        DocBodyController.updateRecord,
    );

router.delete
    (
        '/doc-bodies/:id',
        DocBodyController.removeRecord,
    );

router.get
    (
        '/doc-headers',
        DocHeaderController.getAllRecords,
    );

router.get
    (
        '/doc-headers/:id',
        DocHeaderController.getOneRecord,
    );

router.post
    (
        '/doc-headers',
        DocHeaderController.createRecord,
    );

router.put
    (
        '/doc-headers',
        DocHeaderController.updateRecord,
    );

router.delete
    (
        '/doc-headers/:id',
        DocHeaderController.removeRecord,
    );
module.exports = router;