using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Quartz;
using Volo.Abp.BackgroundWorkers.Quartz;
using Volo.Abp.DependencyInjection;

namespace MokebManagerNg
{
    public class MokebManagerWorker : QuartzBackgroundWorkerBase, ITransientDependency
    {
        private readonly IMokebStateAppService _serviceProvider;

        public MokebManagerWorker(IMokebStateAppService serviceProvider)
        {
            _serviceProvider = serviceProvider;

            JobDetail = JobBuilder.Create<MokebManagerWorker>()
                .WithIdentity(nameof(MokebManagerWorker))
                .Build();

            Trigger = TriggerBuilder.Create()
                .WithIdentity(nameof(MokebManagerWorker))
                .WithSimpleSchedule(s => s
                    .WithIntervalInHours(1) // Set the interval to 1 hour
                    .RepeatForever()
                    .WithMisfireHandlingInstructionIgnoreMisfires())
                .Build();

            ScheduleJob = async scheduler =>
            {
                if (!await scheduler.CheckExists(JobDetail.Key))
                {
                    await scheduler.ScheduleJob(JobDetail, Trigger);
                }
            };
        }

        public override async Task Execute(IJobExecutionContext context)
        {

            var mokebStates = await _serviceProvider.GetListWithDetailAsync();
            var utcNow = DateTime.UtcNow;

            foreach (var mokebState in mokebStates)
            {
                var exitZaerDates = mokebState.Zaer.EntryExitZaerDates.Max(x => x.ExitDate);
                if (exitZaerDates != null)
                {
                    if (utcNow >= exitZaerDates)
                    {
                        await _serviceProvider.DeleteAsync(mokebState.Id);
                    }
                }
            }

        }
    }
}
