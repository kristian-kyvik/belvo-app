const fiscalMockData = {};

fiscalMockData.invoices = [
  {
    "id": "076c66e5-90f5-4e01-99c7-50e32f65ae42",
    "link": "30cb4806-6e00-48a4-91c9-ca55968576c8",
    "collected_at": "2019-09-27T13:01:41.941Z",
    "type": "OUTFLOW",
    "invoice_type": "Ingreso",
    "invoice_identification": "A1A1A1A1-2B2B-3C33-D44D-555555E55EE",
    "invoice_date": "2019-12-01",
    "sender_id": "AAA111111AA11",
    "sender_name": "ACME CORP",
    "receiver_id": "BBB222222BB22",
    "receiver_name": "BELVO CORP",
    "certification_date": "2019-12-01",
    "certification_authority": "CCC333333CC33",
    "cancelation_status": "string",
    "status": "Vigente",
    "cancelation_update_date": "2019-12-02",
    "payroll": {
      "days": 30,
      "type": "O",
      "amount": 20400.1,
      "version": "1.2",
      "date_from": "2018-07-01",
      "date_to": "2018-07-31",
      "collected_at": "2019-09-27T13:01:41.941Z",
      "payment_date": "2018-07-27"
    },
    "invoice_details": [
      {
        "collected_at": "2019-09-27T13:01:41.941Z",
        "description": "December 2019 accounting fees",
        "product_identification": "84101600",
        "quantity": 1,
        "unit_amount": 200,
        "unit_description": "Unidad de servicio",
        "unit_code": "E48",
        "pre_tax_amount": 400,
        "tax_percentage": 16,
        "tax_amount": 64,
        "total_amount": 464,
        "retained_taxes": [
          {
            "collected_at": "2019-09-27T13:01:41.941Z",
            "tax": "ISR",
            "tax_percentage": 10,
            "retained_tax_amount": 209.79
          }
        ]
      }
    ],
    "subtotal_amount": 400,
    "tax_amount": 64,
    "discount_amount": 10,
    "total_amount": 454,
    "exchange_rate": 0.052,
    "currency": "MXN",
    "payment_type_description": "string",
    "payment_method_description": "string",
    "payment_type": "99",
    "payment_method": "PUE",
    "xml": "string"
  }
]

fiscalMockData.taxReturns = [
  {
    "collected_at": "2020-01-07T08:31:09.504500+00:00",
    "informacion_general": {
      "ejercicio": 2018,
      "fecha_hora_presentacion": "2020-01-07T17:28:00-05:00",
      "numero_operacion": "00000000001",
      "periodo_declaracion": "Del Ejercicio",
      "rfc": "ABCD111111A11",
      "tipo_declaracion": "Normal",
      "nombre": "JOHN DOE"
    },
    "sueldos_salarios": {
      "retenedores": [
        {
          "rfc_retenedor": "ABCD222222A22",
          "nombre_denominacion_razon_social": "ACME CORP",
          "ingresos_exentos": 118263,
          "ingreso_anual": 2265,
          "subsidio_empleo": 0
        }
      ],
      "impuesto_retenido": 19497,
      "ingreso_anual": 118263,
      "ingresos_acumulables": 115998,
      "ingresos_exentos": 2265,
      "subsidio_empleo": 0
    },
    "servicios_profesionales": {
      "deducciones_autorizadas": {
        "deducciones_autorizadas": 11870,
        "otras_deducciones": null,
        "detalle_deducciones": [
          {
            "tipo_deduccion": "GASTOS",
            "concepto": "GASOLINA Y MANTENIMIENTO DE TRANSPORTE",
            "monto_detallado": 9682
          },
          {
            "tipo_deduccion": "GASTOS",
            "concepto": "COMPRAS Y GASTOS GENERALES",
            "monto_detallado": 2188
          }
        ],
        "total_deducciones_autorizadas": 11870
      },
      "ingresos": {
        "ingresos_acumulables": 46000,
        "ingresos_exentos": null,
        "otros_ingresos": null,
        "total_ingresos": 46000
      },
      "resultado_fiscal": {
        "utilidad_fiscal": 34130,
        "ptu_pagada_ejercicio": 0,
        "perdidas_fiscales_ejercicios_anteriores_aplicadas": 0,
        "utilidad_gravable": 34130
      },
      "pagos_provisionales": {
        "pagos_provisionales_efectuados_en_ejercicio": 0
      },
      "retenciones_isr": {
        "isr_retenido_personas_morales": 4600
      }
    },
    "deducciones_personales": {
      "honorarios_medicos_dentales_hospitalarios": [
        {
          "rfc_emisor": "ABC333333A33",
          "monto_deducible": 258.83
        },
        {
          "rfc_emisor": "ABC333333A33",
          "monto_deducible": 258.83
        },
        {
          "rfc_emisor": "ABC444444A44",
          "monto_deducible": 1000
        },
        {
          "rfc_emisor": "ABC333333A33",
          "monto_deducible": 258.83
        },
        {
          "rfc_emisor": "ABC333333A33",
          "monto_deducible": 258.83
        },
        {
          "rfc_emisor": "ABC333333A33",
          "monto_deducible": 258.83
        },
        {
          "rfc_emisor": "ABC333333A33",
          "monto_deducible": 258.83
        },
        {
          "rfc_emisor": "ABC444444A44",
          "monto_deducible": 502.34
        },
        {
          "rfc_emisor": "ABC333333A33",
          "monto_deducible": 258.83
        },
        {
          "rfc_emisor": "ABC333333A33",
          "monto_deducible": 258.83
        },
        {
          "rfc_emisor": "ABC333333A33",
          "monto_deducible": 258.83
        },
        {
          "rfc_emisor": "ABC444444A55",
          "monto_deducible": 14183.1
        },
        {
          "rfc_emisor": "ABC444444A66",
          "monto_deducible": 1658
        },
        {
          "rfc_emisor": "ABC444444A77",
          "monto_deducible": 1600
        },
        {
          "rfc_emisor": "ABC444444A88",
          "monto_deducible": 1064
        },
        {
          "rfc_emisor": "ABC444444A99",
          "monto_deducible": 927.57
        }
      ],
      "donativos": [
        {
          "rfc_emisor": "ABC555555A99",
          "monto_deducible": 10.03
        }
      ],
      "aportaciones_voluntarias_complementarias_al_sar": [
        {
          "rfc_emisor": "ABC666666A99",
          "monto_deducible": 12.03
        },
        {
          "rfc_emisor": "ABC777777A99",
          "monto_deducible": 87.22
        }
      ],
      "primas_por_seguros_de_gasto_medico": [
        {
          "rfc_emisor": "ABC777777A99",
          "monto_deducible": 20.03
        }
      ]
    },
    "determinacion_impuesto": {
      "base_gravable": 126864,
      "deducciones_personales": 23264,
      "ingresos_acumulables": 150128,
      "isr_favorable": 10308,
      "isr_conforme_tarifa_final": 13789,
      "isr_retenido": 24097,
      "num_clabe": "000000000000000001",
      "nombre_banco": "BANCO SA",
      "pagos_provisionales": 0,
      "titular_clabe_permite_verificacion": "SÍ",
      "accion_saldo_a_favor": "DEVOLUCIÓN"
    },
    "retenciones": {
      "sueldos_salarios": [
        {
          "rfc_retenedor": "ABC444444A99",
          "monto_retenciones": 118263,
          "retenciones_isr": 19497
        }
      ],
      "dividendos": [],
      "servicios_profesionales": [
        {
          "rfc_retenedor": "ABC444444A00",
          "monto_retenciones": 46000,
          "retenciones_isr": 4600
        }
      ]
    },
    "dividendos": {
      "monto_acumulable_dividendos_utilidades": null,
      "monto_total_isr_pagado_sociedad": null
    },
    "datos_informativos": {
      "credito_fiscal_autorizado_proyectos_investigacion_desarrollo": 0,
      "credito_fiscal_autorizado_proyectos_apoyo_deporte_alto_rendimiento": 0,
      "credito_fiscal_autorizado_proyectos_inversion_artes": 0,
      "credito_fiscal_autorizado_inversion_equipos_fijos": 0,
      "credito_fiscal_autorizado_produccion_distribucion_cinematografica": 0,
      "saldo_credito_fiscal_autorizado_anteriores_investigacion_desarrollo": 0,
      "saldo_credito_fiscal_anteriores_proyectos_inversion_artes": 0,
      "saldo_credito_fiscal_anteriores_produccion_distribucion_cinematografica": 0
    },
    "pdf": null
  }
]

fiscalMockData.taxStatus = [
  {
    "address": {
      "between_street": [
        "RETORNO 4",
        "RETORNO 5"
      ],
      "exterior_number": "123",
      "interior_number": null,
      "locality": "TLALPAN",
      "municipality": "TLALPAN",
      "postal_code": "12345",
      "state": "CIUDAD DE MEXICO",
      "street": "LA MALINCHE",
      "street_type": "CALLE",
      "suburb": "COLINAS DEL BOSQUE"
    },
    "collected_at": "2020-04-23T21:32:55.336854+00:00",
    "economic_activity": [
      {
        "economic_activity": "Asalariado",
        "end_date": null,
        "initial_date": "2017-11-03",
        "order": "1",
        "percentage": "99"
      },
      {
        "economic_activity": "Socio o accionista",
        "end_date": null,
        "initial_date": "2017-11-03",
        "order": "2",
        "percentage": "1"
      }
    ],
    "id_cif": "12345678901",
    "obligations": null,
    "official_name": "PATRICIO",
    "pdf": null,
    "place_and_date_of_issuance": "TLALPAN , CIUDAD DE MEXICO A 19 DE MARZO DE",
    "regimes": [
      {
        "end_date": null,
        "initial_date": "2017-11-03",
        "regime": "Régimen de Ingresos por Dividendos (socios y accionistas)"
      },
      {
        "end_date": null,
        "initial_date": "2017-11-03",
        "regime": "Régimen de Sueldos y Salarios e Ingresos Asimilados a Salarios"
      }
    ],
    "tax_payer_information": {
      "commercial_name": "PATRICIO",
      "curp": "BEMP930403HDFLLT00",
      "email": "patricio@gmail.com",
      "first_last_name": "BELTRAN",
      "last_status_change_date": "2016-02-16",
      "name": "PATRICIO",
      "phone": "1234567890",
      "rfc": "BEMP930403H58",
      "second_last_name": "MOLAS",
      "start_operations_date": "2016-02-16",
      "status_padron": "ACTIVO"
    }
  }
]

export default fiscalMockData;