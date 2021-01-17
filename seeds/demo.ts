import * as Knex from 'knex'
import { v4 as uuidv4 } from 'uuid'

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  const password =
    '$2b$10$bwU7XWjyQMLBdx6gSWFQRuQdZIVhPinhwjsd2iSqAHTO3/Bbwpc9y' // 123456

  const company_profiles = await knex('company_profile').select()
  if (company_profiles.length > 0) {
    return
  }

  const baitabitId = uuidv4()
  const paipeId = uuidv4()
  const saiposId = uuidv4()
  const brazpineId = uuidv4()
  const wtId = uuidv4()
  const soloId = uuidv4()
  await knex('users').insert([
    { id: baitabitId, type: 'company', username: 'baitabit', password },
    { id: paipeId, type: 'company', username: 'paipe', password },
    { id: saiposId, type: 'company', username: 'saipos', password },
    { id: brazpineId, type: 'company', username: 'brazpine', password },
    { id: wtId, type: 'company', username: 'wt', password },
    { id: soloId, type: 'company', username: 'solo', password },
  ])

  await knex('company_profile').insert([
    {
      user_id: baitabitId,
      name: 'BaitaBit',
      bio: 'Uma baita empresa!',
      phone: '51 98197.2268',
      address_state: 'RS',
      address_city: 'Novo Hamburgo',
      areas_of_actuation: '["Tecnologia"]',
    },
    {
      user_id: paipeId,
      name: 'Paipe',
      bio:
        'Trabalhamos para redefinir as relações das pessoas com projetos. Nosso trabalho é feito para proporcionar mais liberdade de tempo e qualidade de vida para clientes e colaboradores. Impulsionar empresas e pessoas é a razão da nossa existência! Quer vir com a gente?',
      phone: '51 3038.3333',
      address_state: 'RS',
      address_city: 'Campo Bom',
      areas_of_actuation: '["Tecnologia"]',
    },
    {
      user_id: saiposId,
      name: 'Saipos',
      bio:
        'A Saipos quer ajudar os empreendedores do ramo da alimentação a otimizarem os processos em seus negócios, tornando-os simples, ágeis e inteligentes.',
      phone: '',
      address_state: 'RS',
      address_city: 'São Leopoldo',
      areas_of_actuation: '["Tecnologia", "Gastronomia"]',
    },
    {
      user_id: brazpineId,
      name: 'Brazpine',
      bio:
        'Somos uma empresa brasileira desenvolvedora de soluções tecnológicas ,softwares, aplicativos e outsourcing para empresas publicas e privadas de diversos segmentos, de médio e grande porte.',
      phone: '51 3091.3223',
      address_state: 'RS',
      address_city: 'São Leopoldo',
      areas_of_actuation: '["Tecnologia"]',
    },
    {
      user_id: wtId,
      name: 'WT.AG',
      bio:
        'Somos uma agência de publicidade que atua nas áreas de branding e performance, com mindset digital first. Entendemos que comportamento e Tecnologia estão mais do que apenas interligados, mas andam em constante mudança. Desta forma, em primeiro lugar, consideramos a experiência digital para trazer resultados capazes de transformar a sua marca.',
      phone: '11 99478.2059',
      address_state: 'SP',
      address_city: 'São Paulo',
      areas_of_actuation: '["Tecnologia", "Publicidade", "Marketing", "Moda"]',
    },
    {
      user_id: soloId,
      name: 'Solo',
      bio:
        'Acreditamos que cada nova ideia é um remix de muitas outras ideias. A autenticidade está na escolha de quais fontes escolhemos beber e em como transformamos aquilo em uma solução para diferentes desafios de comunicação.',
      phone: '51 99581.8516',
      address_state: 'RS',
      address_city: 'Campo Bom',
      areas_of_actuation:
        '["Produção Audiovisual", "Marketing", "Publicidade", "Fotografia", "Música"]',
    },
  ])
}
