# Project Red Table - Data Processing Documentation

## Overview
This document explains how the Project Red Table dashboard processes and filters language data to identify languages at critical risk of not meeting All Access Goals by 2033.

## Data Source
- **Primary Source**: Progress.Bible export (`AAG_Languages_extracted.csv`)
- **Total Languages**: ~5,900 languages with All Access Goals
- **Update Frequency**: Monthly

## The Red Table: Languages at Risk

### What Makes a Language "At Risk"?

A language is considered at risk if it meets ALL of these conditions:

1. **Goal Not Met**: The All Access Goal has not been achieved
2. **Not a Portion**: The goal is greater than 25 chapters (NT, FB, or Two FB)
3. **Activity Status**: Falls into one of these categories:
   - No translation activity started
   - Only language development or scripture engagement (no translation)
   - Active translation but progress uncertain

### Critical Filtering Rule: Second Language Access

**26 languages are excluded** from the risk count because they have:
- Status: "Goal Met - Scripture accessed via second language"

These languages have Scripture access through another language they understand, so while they don't have Scripture in their primary language, their spiritual needs are met. This aligns with the All Access Goals' ultimate purpose: ensuring Scripture access for all people.

## The Numbers

### Final Risk Count: 1,788 Languages
- **New Testament (260 chapters)**: 1,510 languages
- **Full Bible (1,189 chapters)**: 247 languages  
- **Two Full Bibles (2,000+ chapters)**: 31 languages
- **Portions (25 chapters)**: 0 (excluded by definition)

### Activity Breakdown
The 1,788 at-risk languages consist of:
- **714** with no translation activity
- **200** with language development/engagement only
- **2,146** with active translation (but includes many portions)

Note: Numbers don't add to 1,788 because portions are filtered out from the risk calculation.

## Technical Implementation

### Data Processing Pipeline

```javascript
// Core filtering logic
const RULES = {
  // A goal is "not met" if status doesn't contain "goal met"
  // This catches both "Goal Met in the Language" and 
  // "Goal Met - Scripture accessed via second language"
  goalNotMet: (row) =>
    !String(row["All Access Status"]).toLowerCase().includes("goal met"),
    
  // Scope classifications based on chapter goals
  isPortion: (row) => toNumber(row["All Access Chapter Goal"]) === 25,
  isNT: (row) => toNumber(row["All Access Chapter Goal"]) === 260,
  isFB: (row) => toNumber(row["All Access Chapter Goal"]) === 1189,
  isTwoFB: (row) => toNumber(row["All Access Chapter Goal"]) >= 2000,
  
  // Risk calculation: Not a portion + Goal not met + Has activity issue
  inRedSet: (row) =>
    !RULES.isPortion(row) &&
    RULES.goalNotMet(row) &&
    (RULES.noActivity(row) || RULES.activeLDSE(row) || RULES.activeTranslation(row))
};
```

### Why This Matters

The filtering logic ensures we focus resources on languages that:
1. Truly lack Scripture access (not available in any language they understand)
2. Have substantial translation goals (not just portions)
3. Show signs of being at risk of missing the 2033 deadline

## Progress Calculations

### IMPORTANT: Completion vs At-Risk Distinction

The dashboard tracks two different metrics that must not be confused:

1. **Languages Completed** (Goal Met): Languages where Scripture goals have been ACHIEVED
   - These have "Goal Met" in their All Access Status
   - Currently: ~4,117 languages (69.7% of total)
   
2. **Languages At Risk**: Languages unlikely to complete by 2033
   - These lack adequate activity to meet the deadline
   - Currently: 1,788 languages (30.3% of total)

**Critical Note**: The remaining languages (not completed but not at risk) are ON TRACK to complete by 2033. They have active translation at a pace expected to meet the deadline.

### Progress Percentages

All progress indicators show **actual completion** percentages:
- Based on languages with "Goal Met" status
- NOT based on languages that aren't at risk
- Calculated as: (Languages with Goal Met) / (Total Languages) × 100

**Data Limitation**: Current percentages use language counts, not population data. For example:
- A language with 10 million speakers counts the same as one with 10,000 speakers
- True population-weighted progress toward the 95%/99.96%/100% goals would require demographic data
- The current display provides a simplified view based on available data

## Visual Indicators on Dashboard

The dashboard displays:
- **Hero Red Table**: Prominent display of the 1,788 at-risk languages
- **Subtle Note**: "* Excludes languages with access through second language"
- **Mission Bar**: Shows actual completion progress (not just non-at-risk)
- **Summary Statistics**: 
  - Total Languages Analyzed
  - Languages Completed (actual Goal Met count with percentage)
  - At Risk (languages unlikely to finish by 2033 with percentage)
  - Target Year (2033)
- **Breakdown Cards**: Show distribution across NT/FB/Two FB goals
- **Detailed Table**: Available on demand with "Show Breakdown" button

## Updates and Maintenance

Monthly updates should:
1. Download new export from Progress.Bible
2. Replace the CSV file
3. Dashboard automatically recalculates using these rules
4. Verify the risk count is reasonable (±50 from previous month is typical)

## FAQ

**Q: Why are "Goal Met - Scripture accessed via second language" excluded?**
A: These communities have Scripture access through a language they understand. While translation into their heart language may still be valuable, they are not at critical risk of having no Scripture access by 2033.

**Q: Why exclude portions (25 chapters)?**
A: Portion projects are typically smaller in scope and can be completed relatively quickly. The critical risk assessment focuses on larger translation projects (NT and FB) that require years of sustained effort.

**Q: What about languages with active translation?**
A: Even with active translation, a language remains at risk if we cannot verify the pace will meet the 2033 deadline. Many projects start but don't maintain momentum.

## Contact
For questions about the data processing logic or to report discrepancies, contact the ETEN Lab team.
