'use strict'

const Blockly = require('blockly/blockly_compressed')

const {
  formatMultipleColumnNames,
  valueToCode
} = require('./helpers')

const setup = () => {
  Blockly.defineBlocksWithJsonArray([
    // Drop
    {
      type: 'transform_drop',
      message0: 'Drop %1',
      args0: [
        {
          type: 'field_input',
          name: 'MULTIPLE_COLUMNS',
          text: 'column, column'
        }
      ],
      inputsInline: true,
      previousStatement: null,
      nextStatement: null,
      style: 'transform_block',
      tooltip: 'drop columns by name',
      helpUrl: '',
      extensions: ['validate_MULTIPLE_COLUMNS']
    },

    // Filter
    {
      type: 'transform_filter',
      message0: 'Filter %1',
      args0: [
        {
          type: 'input_value',
          name: 'TEST'
        }
      ],
      inputsInline: true,
      previousStatement: null,
      nextStatement: null,
      style: 'transform_block',
      tooltip: 'filter rows by condition',
      helpUrl: ''
    },

    // Group
    {
      type: 'transform_groupBy',
      message0: 'Group by %1',
      args0: [
        {
          type: 'field_input',
          name: 'MULTIPLE_COLUMNS',
          text: 'column, column'
        }
      ],
      inputsInline: true,
      previousStatement: null,
      nextStatement: null,
      style: 'transform_block',
      tooltip: 'group data by values in columns',
      helpUrl: '',
      extensions: ['validate_MULTIPLE_COLUMNS']
    },

    // Mutate
    {
      type: 'transform_mutate',
      message0: 'Mutate %1 %2',
      args0: [
        {
          type: 'field_input',
          name: 'COLUMN',
          text: 'new_column'
        },
        {
          type: 'input_value',
          name: 'VALUE'
        }
      ],
      inputsInline: true,
      previousStatement: null,
      nextStatement: null,
      style: 'transform_block',
      tooltip: 'create new column from existing columns',
      helpUrl: '',
      extensions: ['validate_COLUMN']
    },

    // Report
    {
      type: 'transform_report',
      message0: 'Report %1',
      args0: [
        {
          type: 'field_input',
          name: 'NAME',
          text: 'name'
        }
      ],
      previousStatement: null,
      nextStatement: null,
      style: 'transform_block',
      tooltip: 'report a result',
      helpUrl: '',
      extensions: ['validate_NAME']
    },

    // Select
    {
      type: 'transform_select',
      message0: 'Select %1',
      args0: [
        {
          type: 'field_input',
          name: 'MULTIPLE_COLUMNS',
          text: 'column, column'
        }
      ],
      inputsInline: true,
      previousStatement: null,
      nextStatement: null,
      style: 'transform_block',
      tooltip: 'select columns by name',
      helpUrl: '',
      extensions: ['validate_MULTIPLE_COLUMNS']
    },

    // Sort
    {
      type: 'transform_sort',
      message0: 'Sort %1 descending %2',
      args0: [
        {
          type: 'field_input',
          name: 'MULTIPLE_COLUMNS',
          text: 'column, column'
        },
        {
          type: 'field_checkbox',
          name: 'DESCENDING',
          checked: false
        }
      ],
      inputsInline: true,
      previousStatement: null,
      nextStatement: null,
      style: 'transform_block',
      extensions: ['validate_MULTIPLE_COLUMNS'],
      tooltip: '',
      helpUrl: ''
    },

    // Summarize
    {
      type: 'transform_summarize',
      message0: 'Summarize %1 %2',
      args0: [
        {
          type: 'field_dropdown',
          name: 'OP',
          options: [
            ['all', 'all'],
            ['any', 'any'],
            ['count', 'count'],
            ['maximum', 'maximum'],
            ['mean', 'mean'],
            ['median', 'median'],
            ['minimum', 'minimum'],
            ['stdDev', 'stdDev'],
            ['sum', 'sum'],
            ['variance', 'variance']
          ]
        },
        {
          type: 'field_input',
          name: 'COLUMN',
          text: 'column'
        }
      ],
      inputsInline: true,
      previousStatement: null,
      nextStatement: null,
      style: 'transform_block',
      tooltip: 'summarize values in  column',
      helpUrl: '',
      extensions: ['validate_COLUMN']
    },

    // Ungroup
    {
      type: 'transform_ungroup',
      message0: 'Ungroup',
      args0: [],
      inputsInline: true,
      previousStatement: null,
      nextStatement: null,
      style: 'transform_block',
      tooltip: 'remove grouping',
      helpUrl: ''
    },

    // Unique
    {
      type: 'transform_unique',
      message0: 'Unique %1',
      args0: [
        {
          type: 'field_input',
          name: 'MULTIPLE_COLUMNS',
          text: 'column, column'
        }
      ],
      inputsInline: true,
      previousStatement: null,
      nextStatement: null,
      style: 'transform_block',
      tooltip: 'select rows with unique values',
      helpUrl: '',
      extensions: ['validate_MULTIPLE_COLUMNS']
    }
  ])

  // Drop
  Blockly.TidyBlocks['transform_drop'] = (block) => {
    const columns = formatMultipleColumnNames(block.getFieldValue('MULTIPLE_COLUMNS'))
    return `["@transform", "drop", ${columns}]`
  }

  // Filter
  Blockly.TidyBlocks['transform_filter'] = (block) => {
    const expr = valueToCode(block, 'TEST', Blockly.TidyBlocks.ORDER_NONE)
    return `["@transform", "filter", ${expr}]`
  }

  // Group
  Blockly.TidyBlocks['transform_groupBy'] = (block) => {
    const columns = formatMultipleColumnNames(block.getFieldValue('MULTIPLE_COLUMNS'))
    return `["@transform", "groupBy", ${columns}]`
  }

  // Mutate
  Blockly.TidyBlocks['transform_mutate'] = (block) => {
    const column = block.getFieldValue('COLUMN')
    const value = valueToCode(block, 'VALUE', Blockly.TidyBlocks.ORDER_NONE)
    return `["@transform", "mutate", "${column}", ${value}]`
  }

  // Report
  Blockly.TidyBlocks['transform_report'] = (block) => {
    const name = block.getFieldValue('NAME')
    return `["@transform", "report", "${name}"]`
  }

  // Select
  Blockly.TidyBlocks['transform_select'] = (block) => {
    const columns = formatMultipleColumnNames(block.getFieldValue('MULTIPLE_COLUMNS'))
    return `["@transform", "select", ${columns}]`
  }

  // Sort
  Blockly.TidyBlocks['transform_sort'] = (block) => {
    const columns = formatMultipleColumnNames(block.getFieldValue('MULTIPLE_COLUMNS'))
    const descending = (block.getFieldValue('DESCENDING') === 'TRUE')
    return `["@transform", "sort", ${columns}, ${descending}]`
  }

  // Summarize
  Blockly.TidyBlocks['transform_summarize'] = (block) => {
    const op = block.getFieldValue('OP')
    const column = block.getFieldValue('COLUMN')
    return `["@transform", "summarize", "${op}", "${column}"]`
  }

  // Ungroup
  Blockly.TidyBlocks['transform_ungroup'] = (block) => {
    return `["@transform", "ungroup"]`
  }

  // Unique
  Blockly.TidyBlocks['transform_unique'] = (block) => {
    const columns = formatMultipleColumnNames(block.getFieldValue('MULTIPLE_COLUMNS'))
    return `["@transform", "unique", ${columns}]`
  }
}

module.exports = {
  setup
}
