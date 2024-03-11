import PermissionData from '../DTO/permissionData'

export const listMenusExemple = [
  {
    title: 'Em desenvolvimento...',
    options: []
  }
]
export const listMenusSettings1 = [
  {
    title: 'Configurações',
    options: [
      {
        label: 'Criar Permissão',
        route: '/create-access-permissions'
      },
      {
        label: 'Permissões de Usuário',
        route: '/user-permissions',
        subMenu: [
          { label: 'Visualizar Permissões', route: '/edit-access-permissions' }
        ]
      }
    ]
  }
]
export const listMenusSettings = (permissions: PermissionData) => {
  const list = []
  if (permissions && permissions.p_permission > 0) {
    const options = [
      {
        label: 'Página Inicial',
        route: '/settings-dash',
        subMenu: []
      }
    ]
    if (permissions.p_permission & 2) {
      options.push({
        label: 'Criar Permissão',
        route: '/create-access-permissions',
        subMenu: []
      })
    }
    if (permissions.p_permission & 1) {
      options.push({
        label: 'Permissão de Usuários',
        route: '/user-permissions',
        subMenu: [
          { label: 'Visualizar Permissões', route: '/edit-access-permissions' }
        ]
      })
    }
    if (options.length > 0) {
      list.push({
        title: 'Configurações',
        options: options
      })
    }
  }
  return list
}

export const listMenusManagerAdm = (permissions: PermissionData) => {
  const list = [
    {
      title: 'Módulo Administrativo',
      options: [
        {
          label: 'Página Inicial',
          route: '/admin-dash'
        }
      ]
    }
  ]
  if (permissions && permissions.p_user > 0) {
    const options = []
    if (permissions.p_user & 2) {
      options.push({
        label: 'Cadastro de Usuários',
        route: '/user-register'
      })
    }
    if (permissions.p_user & 1) {
      options.push({
        label: 'Lista de Usuários',
        route: '/user-list',
        subMenu: [{ label: 'Visualizar Usuário', route: '/user-data' }]
      })
    }
    if (options.length > 0) {
      list.push({
        title: 'Usuários',
        options: options
      })
    }
  }

  if (permissions && permissions.p_farm > 0) {
    const options = []
    if (permissions.p_farm & 2) {
      options.push({
        label: 'Cadastro de Fazenda',
        route: '/farm-register'
      })
    }
    if (permissions.p_farm & 1) {
      options.push({
        label: 'Lista de Fazendas',
        route: '/farm-list',
        subMenu: [{ label: 'Visualizar Fazenda', route: '/farm-data' }]
      })
    }
    if (options.length > 0) {
      list.push({
        title: 'Fazendas',
        options: options
      })
    }
  }

  if (permissions && permissions.p_manufacture > 0) {
    const options = []
    if (permissions.p_manufacture & 2) {
      options.push({
        label: 'Cadastro de Fabricante',
        route: '/manufacturer-register'
      })
    }
    if (permissions.p_manufacture & 1) {
      options.push({
        label: 'Lista de Fabricante',
        route: '/manufacturer-list',
        subMenu: [
          { label: 'Visualizar Fabricante', route: '/manufacturer-data' }
        ]
      })
    }
    if (options.length > 0) {
      list.push({
        title: 'Fabricantes',
        options: options
      })
    }
  }
  if (
    permissions &&
    (permissions.p_patrimony_group > 0 || permissions.p_patrimony_item > 0)
  ) {
    const options = []
    if (permissions.p_patrimony_group > 0) {
      if (permissions.p_patrimony_group & 2) {
        options.push({
          label: 'Cadastro de Grupo Patrimonial',
          route: '/patrimony-group-register'
        })
      }
      if (permissions.p_patrimony_group & 1) {
        options.push({
          label: 'Lista de Grupo de Patrimônio',
          route: '/patrimony-group-list',
          subMenu: [
            {
              label: 'Visualizar Grupo de Patrimônio',
              route: '/patrimony-group-data'
            }
          ]
        })
      }
    }
    if (permissions.p_patrimony_item > 0) {
      if (permissions.p_patrimony_item & 2) {
        options.push({
          label: 'Cadastro de Patrimônio',
          route: '/patrimony-register'
        })
      }
      if (permissions.p_patrimony_item & 1) {
        options.push({
          label: 'Lista de Patrimônios',
          route: '/patrimony-list',
          subMenu: [
            { label: 'Visualizar Patrimônio', route: '/patrimony-data' }
          ]
        })
      }
    }
    list.push({
      title: 'Patrimônio',
      options: options
    })
  }

  return list
}

export const listMenusManager = [
  {
    title: 'Usuários',
    options: [
      {
        label: 'Cadastro de Usuários',
        route: '/user-register'
      },
      {
        label: 'Lista de Usuários',
        route: '/user-list',
        subMenu: [{ label: 'Visualizar Usuário', route: '/user-data' }]
      }
    ]
  },
  {
    title: 'Fazendas',
    options: [
      {
        label: 'Cadastro de Fazenda',
        route: '/farm-register'
      },
      {
        label: 'Lista de Fazendas',
        route: '/farm-list',
        subMenu: [{ label: 'Visualizar Fazenda', route: '/farm-data' }]
      }
    ]
  },
  {
    title: 'Fabricantes',
    options: [
      {
        label: 'Cadastro de Fabricante',
        route: '/manufacturer-register'
      },
      {
        label: 'Lista de Fabricante',
        route: '/manufacturer-list',
        subMenu: [
          { label: 'Visualizar Fabricante', route: '/manufacturer-data' }
        ]
      }
    ]
  },
  {
    title: 'Patrimônio',
    options: [
      {
        label: 'Cadastro de Grupo Patrimonial',
        route: '/patrimony-group-register'
      },

      {
        label: 'Cadastro de Patrimônio',
        route: '/patrimony-register'
      },
      {
        label: 'Lista de Grupo de Patrimônio',
        route: '/patrimony-group-list',
        subMenu: [
          {
            label: 'Visualizar Grupo de Patrimônio',
            route: '/patrimony-group-data'
          }
        ]
      },
      {
        label: 'Lista de Patrimônios',
        route: '/patrimony-list',
        subMenu: [{ label: 'Visualizar Patrimônio', route: '/patrimony-data' }]
      }
    ]
  }
]

export const listMenusPatrimony = [
  {
    title: 'Patrimônio',
    options: [
      {
        label: 'Página Inicial',
        route: '/patrimony-dash'
      },
      {
        label: 'Gerar QR Code',
        route: '/patrimony-qrcode'
      },
      {
        label: 'Histórico de Operação',
        route: 'patrimony-dash'
      },
      {
        label: 'Histórico de Manutenção',
        route: 'patrimony-dash'
      }
    ]
  }
]

export const listMenusOparation = [
  {
    title: 'Operações',
    options: [
      {
        label: 'Página Inicial',
        route: '/operation-dash'
      },
      {
        label: 'Check-in na máquina',
        route: '/check-in'
      },
      {
        label: 'Histórico de Check-in',
        route: '/check-in-historic'
      }
    ]
  },
  {
    title: 'Informe Manutenção/Problema',
    options: [
      {
        label: 'Relatar Problema',
        route: '/problem-register',
        subMenu: [
          {
            label: 'Inserir dados',
            route: '/problem-register-items'
          }
        ]
      }
    ]
  }
]
