export const API = {
  // Auth
  login: '/v1/accounts/login',

  // File Upload
  downloadFile: (type: string, filename: string) => `v1/file/download/${type}/${filename}`,
  uploadFile: 'v1/file/upload',

  // Certificate Design
  getCertificateDesigns: '/v1/certificate_designs',
  getCertificateDesignDetails: (id: string) => `/v1/certificate_designs/${id}`,
  createCertificateDesign: '/v1/certificate_designs',
  updateCertificateDesign: (id: string) => `/v1/certificate_designs/${id}`,
  deleteCertificateDesign: (id: string) => `/v1/certificate_designs/${id}`,
}